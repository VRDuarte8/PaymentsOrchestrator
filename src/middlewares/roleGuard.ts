import type { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const roleGuard = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      return res
        .status(403)
        .json({ error: 'Você não possui autorização para esta ação!' });
    }

    next();
  };
};
