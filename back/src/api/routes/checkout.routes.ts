import express, { Router } from 'express';
import { createCheckoutValidator } from '../modules/checkout/checkout.validator';
import { checkout } from '../modules/checkout/checkout.controller';

const router: Router = express.Router();

router.post('/', createCheckoutValidator, checkout);

export default router;
