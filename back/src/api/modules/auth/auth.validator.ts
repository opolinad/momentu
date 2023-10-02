import { body } from 'express-validator';
import { buildValidationsArray } from '../../utils/validation/validation.utils';
import User from '../../../db/models/user.model';
import Role from '../../../db/models/role.model';

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
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Invalid credentials')
    .bail()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/)
    .withMessage('Invalid credentials'),
]);

export const registerUserValidator = buildValidationsArray([
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .bail()
    .isString()
    .withMessage('Invalid first name'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .bail()
    .isString()
    .withMessage('Invalid last name'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is incorrectly formated')
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error('Email is already registered');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Invalid credentials')
    .bail()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/)
    .withMessage('Invalid credentials'),
  body('roleId')
    .notEmpty()
    .withMessage('Role id is required')
    .bail()
    .isNumeric()
    .bail()
    .withMessage('Role id must be numberic')
    .custom(async (value) => {
      const role = await Role.findByPk(value);
      if (!role) {
        throw new Error('Invalid role id');
      }
    }),
  body('isActive')
    .notEmpty()
    .withMessage('Is active is required')
    .bail()
    .isBoolean()
    .withMessage('Is active must be boolean'),
]);
