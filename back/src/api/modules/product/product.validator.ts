import { body, param } from 'express-validator';
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
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .bail()
    .isNumeric()
    .withMessage('Price is incorrect'),
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

export const productExists = buildValidationsArray([
  param('productId')
    .exists()
    .withMessage('Product id is required')
    .bail()
    .isInt()
    .toInt()
    .withMessage('Product id must be integer')
    .bail()
    .custom(async (value, { req }) => {
      const product = await Product.findByPk(value);
      if (!product) {
        throw new Error('Product does not exist');
      }
      req.product = product;
    }),
]);
