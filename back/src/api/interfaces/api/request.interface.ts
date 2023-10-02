import { Request } from 'express';
import User from '../../../db/models/user.model';
import Product from '../../../db/models/product.model';

export interface userRequest extends Request {
  user: User;
}

export interface productRequest extends Request {
  product: Product;
}
