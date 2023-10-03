import React from 'react';

export const PaymentResult = () => {
  const paymentResult = window.location.href.includes('success') ? 'Successful' : 'Failed';
  return (
    <div>
      <h1>Payment { paymentResult }</h1>
    </div>
  );
};
