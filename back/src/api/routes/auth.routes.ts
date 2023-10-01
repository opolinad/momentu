import express, { Router } from 'express';
import { loginUser } from '../modules/auth/auth.controller';
import { loginUserValidator } from '../modules/auth/auth.validator';

const router: Router = express.Router();

router.post('/login', loginUserValidator, loginUser);

export default router;
