import express, { Router } from 'express';
import {
  createProduct,
  getAllProducts,
} from '../modules/product/product.controller';
import { createProductValidator } from '../modules/product/product.validator';
import { userAuthenticated } from '../middlewares/user/userAuthenticated.middleware';

const router: Router = express.Router();

router.use(userAuthenticated);
router
  .route('/')
  .get(getAllProducts)
  .post(createProductValidator, createProduct);
export default router;
