import * as dotenv from 'dotenv';
import {
  pagination,
  paginationResults,
  results,
} from '../../interfaces/pagination/pagination.interface';
import { BusinessException } from '../errors/bussinessException.errors';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';

dotenv.config();

export const paginationItems = (
  page: string | undefined,
  perPage: string | undefined,
): pagination => {
  const pageNumber = Number(page) || 1;
  const limit = Number(perPage) || 10;
  const offset = (pageNumber - 1) * limit;
  const pagination = { pageNumber, limit, offset };

  return pagination;
};

const getTotalPages = (totalPages: number, perPage: number) => {
  return Math.ceil(totalPages / perPage);
};

export const paginateResults = (
  results: results,
  perPage: number,
  page: number,
  route: string,
) => {
  const URL = process.env.URL + ':' + process.env.SERVER_PORT;
  const totalPages = getTotalPages(results.count, perPage);

  if (page > totalPages) {
    throw new BusinessException(
      httpStatusCode.BadRequest,
      `The page you are requesting does not have products. The total number of pages is ${totalPages}`,
    );
  }

  const resultsWithPaginationProperties: paginationResults<results> = {
    ...results,
    totalPages: totalPages,
    prevPageUrl:
      page > 1 ? URL + '/api/' + route + '?page=' + (page - 1) : null,
    nextPageUrl:
      totalPages > page ? URL + '/api/' + route + '?page=' + (page + 1) : null,
  };
  return resultsWithPaginationProperties;
};
