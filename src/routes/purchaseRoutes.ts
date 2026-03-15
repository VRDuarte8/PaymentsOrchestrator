import { Router } from 'express';
import { validate } from '../middlewares/handleValidations.js';
import { purchaseValidation } from '../middlewares/purchaseValidations.js';
import { authGuard } from '../middlewares/authGuard.js';
import {
  purchase,
  listTransactions,
  listTransactionById,
  listClients,
  listClientById,
} from '../controllers/purchaseController.js';

const router = Router();

router.post('/', purchaseValidation(), validate, purchase);
router.get('/', authGuard, listTransactions);
router.get('/clients', authGuard, listClients);
router.get('/:id', authGuard, listTransactionById);
router.get('/clients/:id', authGuard, listClientById);

export default router;
