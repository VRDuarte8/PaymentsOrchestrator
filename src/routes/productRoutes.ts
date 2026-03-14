import { Router } from 'express';
import { Role } from '@prisma/client';
import {
  createProduct,
  listProducts,
  listProductbyId,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { validate } from '../middlewares/handleValidations.js';
import { productValidation } from '../middlewares/productValidations.js';
import { authGuard } from '../middlewares/authGuard.js';
import { roleGuard } from '../middlewares/roleGuard.js';

const router = Router();

router.get('/', authGuard, listProducts);
router.post(
  '/register',
  authGuard,
  roleGuard([Role.ADMIN, Role.MANAGER, Role.FINANCE]),
  productValidation(),
  validate,
  createProduct,
);
router.get('/:id', authGuard, listProductbyId);
router.put(
  '/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.MANAGER, Role.FINANCE]),
  productValidation(),
  validate,
  updateProduct,
);
router.delete(
  '/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.MANAGER, Role.FINANCE]),
  deleteProduct,
);

export default router;
