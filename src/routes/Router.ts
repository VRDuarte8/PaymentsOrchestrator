import type { Request, Response } from 'express';
import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js'
import gatewayRoutes from './gatewayRoutes.js'
//import purchaseRoutes from './purchaseRoutes.js';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/gateways', gatewayRoutes);
//router.use('/api/purchase', purchaseRoutes);

//test
router.get('/api/', (req: Request, res: Response) => {
  res.send('API working');
});

export default router;
