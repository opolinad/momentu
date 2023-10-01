import { Response } from 'express';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';
import { response } from '../../interfaces/api/response.interface';

export const apiResponse = <T>(res: Response, responseObject: response<T>) => {
  const responseData = responseObject.data ? { data: responseObject.data } : {};
  res
    .status(responseObject.status)
    .json({ message: responseObject.message, ...responseData });
};

export const buildResponseObject = <T>(
  status: httpStatusCode,
  message: string,
  data?: T,
): response<T> => {
  const responseData = data ? { data } : {};
  return { status, message, ...responseData };
};

export const buildResponseInternalErrorObject = () => {
  return {
    status: httpStatusCode.InternalServerError,
    message: 'Internal server error. If problem persists, please contact admin',
  };
};
