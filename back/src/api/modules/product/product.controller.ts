import { Request, Response } from 'express';
import { apiResponse } from '../../utils/responses/apiResponse.response';
import { getProducts } from './product.service';

export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const responseObject = await getProducts();
  apiResponse(res, responseObject);
};
