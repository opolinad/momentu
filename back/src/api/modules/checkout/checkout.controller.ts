import { Request, Response } from 'express';
import { apiResponse } from '../../utils/responses/apiResponse.response';
import { createCheckout, updatePaymentStatus } from './checkout.service';

export const checkout = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body;
  const responseObject = await createCheckout(userId, productId);
  apiResponse(res, responseObject);
};

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  const { sessionId, paymentId } = req.body;
  const responseObject = await updatePaymentStatus(sessionId, paymentId);
  apiResponse(res, responseObject);
};
