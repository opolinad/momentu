import { RequestHandler, Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { validationError } from '../../interfaces/validation/validation.interface';
import {
  apiResponse,
  buildResponseObject,
} from '../responses/ApiResponse.response';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';

const validate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorsSummarized = summarizeErrors(errors.array() as validationError[]);

  apiResponse(
    res,
    buildResponseObject(
      httpStatusCode.BadRequest,
      'Verifique los datos de entrada',
      { errors: errorsSummarized },
    ),
  );
};

export const buildValidationsArray = (
  validations: (ValidationChain | RequestHandler)[],
) => {
  return [...validations, validate];
};

const summarizeErrors = (errors: validationError[]) => {
  const result: Record<string, string[]> = {};
  for (const error of errors) {
    const { path, msg } = error;

    if (!result[path]) {
      result[path] = [msg];
    } else {
      !result[path].includes(msg) && result[path].push(msg);
    }
  }

  return result;
};
