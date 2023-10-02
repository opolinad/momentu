import Product from '../../../db/models/product.model';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';
import { response } from '../../interfaces/api/response.interface';
import {
  buildResponseInternalErrorObject,
  buildResponseObject,
} from '../../utils/responses/apiResponse.response';

export const getProducts = async (): Promise<
  response<null | { products: Product[] }>
> => {
  try {
    const products = await Product.findAll({ raw: true });
    return buildResponseObject(httpStatusCode.OK, 'Products retrieved', {
      products,
    });
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};
