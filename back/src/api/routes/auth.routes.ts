import express, { Router } from 'express';
import { loginUser, registerUser } from '../modules/auth/auth.controller';
import {
  loginUserValidator,
  registerUserValidator,
} from '../modules/auth/auth.validator';

const router: Router = express.Router();

router.post('/login', loginUserValidator, loginUser);
router.post('/register', registerUserValidator, registerUser);

export default router;
