import { Op } from 'sequelize';
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
  search: string,
): Promise<
  response<null | unknown | { products: paginationResults<results> }>
> => {
  try {
    const { limit, offset, pageNumber } = paginationItems;
    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }
    const products = await Product.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      where: whereClause,
    });

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

export const saveProduct = async (
  product: Product,
): Promise<response<null | { product: Product }>> => {
  try {
    const productCreated = await Product.create({ ...product });
    return buildResponseObject(httpStatusCode.Created, 'Product created', {
      product: productCreated,
    });
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};

export const getOneProduct = async (
  product: Product,
): Promise<response<null | { product: Product }>> => {
  try {
    return buildResponseObject(httpStatusCode.OK, 'Product retrieved', {
      product,
    });
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};

export const changeProduct = async (
  productId: number,
  product: Product,
): Promise<response<null>> => {
  try {
    await Product.update({ ...product }, { where: { id: productId } });
    return buildResponseObject(httpStatusCode.OK, 'Product updated');
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};

export const removeProduct = async (
  product: Product,
): Promise<response<null>> => {
  try {
    await product.destroy();
    return buildResponseObject(httpStatusCode.OK, 'Product deleted');
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};
