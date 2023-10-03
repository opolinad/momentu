import express, { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import checkoutRoutes from './checkout.routes';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/checkout', checkoutRoutes);

export default router;
