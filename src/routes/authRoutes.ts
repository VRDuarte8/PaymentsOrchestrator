import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validate } from '../middlewares/handleValidations.js';
import {
  registerValidation,
  loginValidation,
} from '../middlewares/userValidations.js';

const router = Router();

router.post('/register', registerValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);

export default router;
