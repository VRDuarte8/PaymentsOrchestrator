import { Router } from 'express';
import { Role } from '@prisma/client';
import {
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { validate } from '../middlewares/handleValidations.js';
import {
  userUpdateValidation,
} from '../middlewares/userValidations.js';
import { authGuard } from '../middlewares/authGuard.js';
import { roleGuard } from '../middlewares/roleGuard.js';

const router = Router();

router.put(
  '/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.MANAGER]),
  userUpdateValidation(),
  validate,
  updateUser,
);
router.delete(
  '/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.MANAGER]),
  deleteUser,
);

export default router;
