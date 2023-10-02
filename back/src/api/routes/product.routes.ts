import express, { Router } from 'express';
import { getAllProducts } from '../modules/product/product.controller';
import { userAuthenticated } from '../middlewares/user/userAuthenticated.middleware';

const router: Router = express.Router();

router.use(userAuthenticated);
router.get('', getAllProducts);
export default router;
