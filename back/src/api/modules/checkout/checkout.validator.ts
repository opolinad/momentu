import { body } from 'express-validator';
import { buildValidationsArray } from '../../utils/validation/validation.utils';
import User from '../../../db/models/user.model';
import Product from '../../../db/models/product.model';

export const createCheckoutValidator = buildValidationsArray([
  body('userId')
    .notEmpty()
    .withMessage('User id is required')
    .bail()
    .isInt()
    .toInt()
    .withMessage('User id must be integer')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error('User does not exist');
      }
    }),
  body('productId')
    .notEmpty()
    .withMessage('Product id is required')
    .bail()
    .isInt()
    .toInt()
    .withMessage('Product id must be integer')
    .custom(async (value) => {
      const product = await Product.findByPk(value);
      if (!product) {
        throw new Error('Product does not exist');
      }
    }),
]);
