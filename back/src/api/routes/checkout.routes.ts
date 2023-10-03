import express, { Router } from 'express';
import { createCheckoutValidator } from '../modules/checkout/checkout.validator';
import { checkout, updateStatus } from '../modules/checkout/checkout.controller';

const router: Router = express.Router();

router.post('/', createCheckoutValidator, checkout);
router.post('/update-status',updateStatus);

export default router;
