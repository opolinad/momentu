import { Request, Response } from 'express';
import { apiResponse } from '../../utils/responses/apiResponse.response';
import { getOneProduct, getProducts, saveProduct } from './product.service';
import { paginationItems } from '../../utils/pagination/pagination.utils';
import Product from '../../../db/models/product.model';
import { productRequest } from '../../interfaces/api/request.interface';

export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { page, perPage } = req.query;
  const pagination = paginationItems(page as string, perPage as string);
  const responseObject = await getProducts(pagination);
  apiResponse(res, responseObject);
};

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const responseObject = await saveProduct(req.body as Product);
  apiResponse(res, responseObject);
};

export const getProduct = async (
  req: productRequest,
  res: Response,
): Promise<void> => {
  const responseObject = await getOneProduct(req.product);
  apiResponse(res, responseObject);
};
