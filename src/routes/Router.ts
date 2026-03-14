import type { Request, Response } from 'express';
import { Router } from 'express';
import authRoutes from './authRoutes.js';
//import purchaseRoutes from './purchaseRoutes.js';

const router = Router();

router.use('/api/auth', authRoutes);
//router.use('/api/purchase', purchaseRoutes);

//test
router.get('/', (req: Request, res: Response) => {
  res.send('API working');
});

export default router;
