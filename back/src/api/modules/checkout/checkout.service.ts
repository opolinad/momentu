import { response } from '../../interfaces/api/response.interface';
import Order from '../../../db/models/order.model';
import { httpStatusCode } from '../../interfaces/api/httpStatusCodes.interface';
import {
  buildResponseInternalErrorObject,
  buildResponseObject,
} from '../../utils/responses/apiResponse.response';
import Payment from '../../../db/models/payment.model';
import Product from '../../../db/models/product.model';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';
import OrderProduct from '../../../db/models/orderProduct.model';

dotenv.config();

export const createCheckout = async (
  userId: number,
  productId: number,
): Promise<
  response<null | {
    session: Stripe.Checkout.Session;
  }>
> => {
  try {
    const product = await Product.findByPk(productId);
    const paymentCreated = await savePayment(product);
    const orderCreated = await saveOrder(userId, paymentCreated.id);
    await saveOrderProduct(orderCreated.id, productId);
    const session = await createStripePayment(product);
    return buildResponseObject(httpStatusCode.Created, 'Checkout created', {
      session,
    });
  } catch (error) {
    return buildResponseInternalErrorObject();
  }
};

const saveOrder = async (userId: number, paymentId: number): Promise<Order> => {
  const orderCreated = await Order.create({ userId, paymentId });
  return orderCreated;
};

const savePayment = async (product: Product): Promise<Payment> => {
  const paymentCreated = await Payment.create({
    statusId: 1,
    price: product.price,
    date: new Date(),
    method: 1,
    payerName: 'test',
  });
  return paymentCreated;
};

const saveOrderProduct = async (orderId: number, productId: number) => {
  const orderProductCreated = await OrderProduct.create({
    orderId,
    productId,
  });
  return orderProductCreated;
};

const createStripePayment = async (
  product: Product,
): Promise<Stripe.Checkout.Session> => {
  const CLIENT_URL = process.env.CLIENT_URL;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${CLIENT_URL}/success`,
    cancel_url: `${CLIENT_URL}/cancel`,
  });
  return session;
};
