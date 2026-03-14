import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ errors: ['Token não fornecido!'] });
  }

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ errors: ['Acesso negado!'] });

  try {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not defined');
    }

    const verified = jwt.verify(token, jwtSecret) as { userId: string };

    const user = await prisma.user.findUnique({
      where: {
        id: verified.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ errors: ['Usuário inválido!'] });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ errors: ['O Token é inválido!'] });
  }
};
