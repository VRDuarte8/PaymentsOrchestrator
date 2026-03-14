import { Router } from 'express';
import { validate } from '../middlewares/handleValidations.js';
import { purchaseValidation } from '../middlewares/purchaseValidations.js';
import {
  purchase,
  listTransactions,
  listTransactionById,
  listClients,
  listClientById,
} from '../controllers/purchaseController.js';

const router = Router();

router.post('/', purchaseValidation(), validate, purchase);
router.get('/', listTransactions);
router.get('/clients', listClients);
router.get('/:id', listTransactionById);
router.get('/clients/:id', listClientById);

export default router;
