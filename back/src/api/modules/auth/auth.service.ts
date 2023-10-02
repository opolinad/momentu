import User from '../../../db/models/user.model';
import { response } from '../../interfaces/api/response.interface';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {
  buildResponseInternalErrorObject,
  buildResponseObject,
} from '../../utils/responses/apiResponse.response';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';

dotenv.config();

export const login = async (
  user: User,
  password: string,
): Promise<response<null | { token: string }>> => {
  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token: string = await generateAuthToken(user);
      return buildResponseObject(httpStatusCode.OK, 'Login successful', {
        token,
      });
    } else {
      return buildResponseObject(
        httpStatusCode.Forbidden,
        'The request could not be completed, invalid credentials',
      );
    }
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};

const generateAuthToken = async (user: User): Promise<string> => {
  const token = await jwt.sign(
    { userId: user.id, userRoleId: user.roleId },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );
  return token;
};

export const register = async (
  user: User,
): Promise<response<null | { token: string }>> => {
  try {
    user.password = bcrypt.hashSync(
      user.password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );
    const userCreated = await User.create({ ...user });
    const token: string = await generateAuthToken(userCreated);
    return buildResponseObject(httpStatusCode.Created, 'Register successful', {
      token,
    });
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};
