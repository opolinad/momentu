import express, { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
} from '../modules/product/product.controller';
import {
  createProductValidator,
  productExists,
} from '../modules/product/product.validator';
import { userAuthenticated } from '../middlewares/user/userAuthenticated.middleware';

const router: Router = express.Router();

router.use(userAuthenticated);
router
  .route('/')
  .get(getAllProducts)
  .post(createProductValidator, createProduct);

router.use('/:productId', productExists);
router.route('/:productId').get(getProduct);
export default router;
