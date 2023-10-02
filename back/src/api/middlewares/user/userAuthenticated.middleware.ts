import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import {
  apiResponse,
  buildResponseObject,
} from '../../utils/responses/apiResponse.response';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';

export const userAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    apiResponse(
      res,
      buildResponseObject(httpStatusCode.Forbidden, 'User not authenticated'),
    );
  }
};
