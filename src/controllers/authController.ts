import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (userId: string) => {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not defined');
  }
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: '7d',
  });
};

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(422).json({ errors: ['E-mail já cadastrado!'] });
    }

    // Password Hash
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role: role ?? 'USER',
      },
    });

    if (!newUser) {
      return res
        .status(422)
        .json({ errors: ['Houve um erro no registro do usuário!'] });
    }

    res.status(201).json({
      id: newUser.id,
      token: generateToken(newUser.id),
    });
  } catch (error) {
    console.error('Erro de Registro: ', error);
    return res.status(500).json({ error: 'Erro interno ao criar usuário!' });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ errors: ['Credenciais inválidas!'] });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(422).json({ errors: ['Credenciais inválidas!'] });
    }

    res.status(200).json({
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error('Erro de Login: ', error);
    return res.status(500).json({ error: 'Erro interno ao logar usuário!' });
  }
};
