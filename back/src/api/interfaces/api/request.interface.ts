import { Request } from 'express';
import User from '../../../db/models/user.model';

export interface userRequest extends Request {
  user: User;
}
