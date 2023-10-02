import { Request, Response } from 'express';
import { login, register } from './auth.service';
import { apiResponse } from '../../utils/responses/apiResponse.response';
import { userRequest } from '../../interfaces/api/request.interface';
import User from '../../../db/models/user.model';

export const loginUser = async (
  req: userRequest,
  res: Response,
): Promise<void> => {
  const responseObject = await login(req.user, req.body.password);
  apiResponse(res, responseObject);
};

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const responseObject = await register(req.body as User);
  apiResponse(res, responseObject);
};
