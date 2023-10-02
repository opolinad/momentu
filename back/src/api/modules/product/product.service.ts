import Product from '../../../db/models/product.model';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';
import { response } from '../../interfaces/api/response.interface';
import {
  pagination,
  paginationResults,
  results,
} from '../../interfaces/pagination/pagination.interface';
import { BusinessException } from '../../utils/errors/bussinessException.errors';
import { paginateResults } from '../../utils/pagination/pagination.utils';
import {
  buildResponseInternalErrorObject,
  buildResponseObject,
} from '../../utils/responses/apiResponse.response';

export const getProducts = async (
  paginationItems: pagination,
): Promise<
  response<null | unknown | { products: paginationResults<results> }>
> => {
  try {
    const { limit, offset, pageNumber } = paginationItems;
    const products = await Product.findAndCountAll({ limit, offset });
    const productsPaginated = paginateResults(
      products,
      limit,
      pageNumber,
      'product',
    );

    return buildResponseObject(httpStatusCode.OK, 'Products retrieved', {
      products: productsPaginated,
    });
  } catch (error) {
    if (error instanceof BusinessException) return error.getResponseObject();

    return buildResponseInternalErrorObject();
  }
};
