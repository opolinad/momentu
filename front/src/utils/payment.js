import { loadStripe } from '@stripe/stripe-js';
import authorizedFetch from './authorizedFetch';

export const makePayment = async (product) => {
  const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const apiUrl = `${process.env.REACT_APP_API_URL}/checkout`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: product.id, userId: 1 }),
  };

  const response = await authorizedFetch(apiUrl, options);
  const session = await response.data.session;

  const result = stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    throw new Error(result.error);
  }
};
