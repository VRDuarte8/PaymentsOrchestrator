import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.js';
import { Role } from '@prisma/client';

// Update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { password, role } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(422).json({ errors: ['Usuário não encontrado!'] });
    }

    const updatedData: any = {};

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    if (role) {
      updatedData.role = role as Role;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).json({
      id: updatedUser.id,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error('Erro de Update: ', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao atualizar o usuário!' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(422).json({ errors: ['Usuário não encontrado!'] });
    }

    await prisma.user.delete({ where: { id } });

    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro de Delete: ', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao deletar o usuário!' });
  }
};
