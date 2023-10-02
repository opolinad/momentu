import { Request, Response } from 'express';
import { apiResponse } from '../../utils/responses/apiResponse.response';
import { getProducts } from './product.service';
import { paginationItems } from '../../utils/pagination/pagination.utils';

export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { page, perPage } = req.query;
  const pagination = paginationItems(page as string, perPage as string);
  const responseObject = await getProducts(pagination);
  apiResponse(res, responseObject);
};
