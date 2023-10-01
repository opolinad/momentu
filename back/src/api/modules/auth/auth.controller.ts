import { Response } from 'express';
import { login } from './auth.service';
import { apiResponse } from '../../utils/responses/ApiResponse.response';
import { userRequest } from '../../interfaces/api/request.interface';

export const loginUser = async (
  req: userRequest,
  res: Response,
): Promise<void> => {
  const responseObject = await login(req.user, req.body.password);
  apiResponse(res, responseObject);
};
