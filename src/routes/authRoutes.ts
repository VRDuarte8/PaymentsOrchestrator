import { Router } from 'express';
import { Role } from '@prisma/client';
import {
  register,
  login,
  updateUser,
  deleteUser,
} from '../controllers/authController.js';
import { validate } from '../middlewares/handleValidations.js';
import {
  registerValidation,
  loginValidation,
  userUpdateValidation,
} from '../middlewares/userValidations.js';
import { authGuard } from '../middlewares/authGuard.js';
import { roleGuard } from '../middlewares/roleGuard.js';

const router = Router();

router.post('/register', registerValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.put(
  '/users/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.MANAGER]),
  userUpdateValidation(),
  validate,
  updateUser,
);
router.delete(
  '/users/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.MANAGER]),
  deleteUser,
);

export default router;
