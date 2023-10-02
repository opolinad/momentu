import express, { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);

export default router;
