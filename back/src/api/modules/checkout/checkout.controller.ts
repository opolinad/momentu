import { Request, Response } from 'express';
import { apiResponse } from '../../utils/responses/apiResponse.response';
import { createCheckout } from './checkout.service';

export const checkout = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body;
  const responseObject = await createCheckout(userId, productId);
  apiResponse(res, responseObject);
};
