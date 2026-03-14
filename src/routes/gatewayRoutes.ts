import { Router } from 'express';
import { Role } from '@prisma/client';
import { validate } from '../middlewares/handleValidations.js';
import {
  nameValidation,
  priorityValidation,
} from '../middlewares/gatewayValidations.js';
import { authGuard } from '../middlewares/authGuard.js';
import { roleGuard } from '../middlewares/roleGuard.js';
import {
  registerGateway,
  listGateways,
  listGatewaybyId,
  enableOrDisableGateway,
  changeGatewayPriority,
  deleteGateway,
} from '../controllers/gatewayController.js';

const router = Router();

router.post(
  '/register',
  authGuard,
  roleGuard([Role.ADMIN, Role.FINANCE]),
  nameValidation(),
  validate,
  registerGateway,
);
router.get('/', authGuard, listGateways);
router.get('/:id', authGuard, listGatewaybyId);
router.put(
  '/active/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.FINANCE]),
  enableOrDisableGateway,
);
router.put(
  '/priority/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.FINANCE]),
  priorityValidation(),
  validate,
  changeGatewayPriority,
);
router.delete(
  '/:id',
  authGuard,
  roleGuard([Role.ADMIN, Role.FINANCE]),
  deleteGateway,
);

export default router;
