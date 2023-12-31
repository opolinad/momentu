import { Request, Response } from 'express';
import { apiResponse } from '../../utils/responses/apiResponse.response';
import {
  changeProduct,
  getOneProduct,
  getProducts,
  removeProduct,
  saveProduct,
} from './product.service';
import { paginationItems } from '../../utils/pagination/pagination.utils';
import Product from '../../../db/models/product.model';
import { productRequest } from '../../interfaces/api/request.interface';

export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { page, perPage, search } = req.query;
  const pagination = paginationItems(page as string, perPage as string);
  const responseObject = await getProducts(pagination, search as string);
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

export const updateProduct = async (
  req: productRequest,
  res: Response,
): Promise<void> => {
  const responseObject = await changeProduct(
    req.product.id,
    req.body as Product,
  );
  apiResponse(res, responseObject);
};

export const deleteProduct = async (
  req: productRequest,
  res: Response,
): Promise<void> => {
  const responseObject = await removeProduct(req.product);
  apiResponse(res, responseObject);
};
