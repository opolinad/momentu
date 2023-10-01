import { body } from 'express-validator';
import { buildValidationsArray } from '../../utils/validation/validation.utils';
import User from '../../../db/models/user.model';

export const loginUserValidator = buildValidationsArray([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is incorrectly formated')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error('Invalid credentials');
      } else {
        req.user = user;
      }
    }),
  body('password').notEmpty().withMessage('Password is required').bail(),
  // .isLength({ min: 8 })
  // .withMessage('Invalid credentials')
  // .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/)
  // .withMessage('Invalid credentials'),
]);
