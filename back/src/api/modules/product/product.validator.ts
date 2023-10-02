import { body } from 'express-validator';
import { buildValidationsArray } from '../../utils/validation/validation.utils';
import Product from '../../../db/models/product.model';

export const createProductValidator = buildValidationsArray([
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isString()
    .withMessage('Title is incorrect')
    .custom(async (value) => {
      const product = await Product.findOne({ where: { title: value } });
      if (product) {
        throw new Error('Product title already registered');
      }
    }),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .bail()
    .isString()
    .withMessage('Description is incorrect'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .bail()
    .isString()
    .withMessage('Category is incorrect'),
  body('imageUrl')
    .notEmpty()
    .withMessage('Image url is required')
    .bail()
    .isURL()
    .withMessage('Image url is incorrect'),
]);
