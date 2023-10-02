import express, { Router } from 'express';
import { getAllProducts } from '../modules/product/product.controller';

const router: Router = express.Router();

router.get('', getAllProducts);
export default router;
