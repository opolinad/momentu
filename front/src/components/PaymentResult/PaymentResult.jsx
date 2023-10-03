import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import authorizedFetch from '../../utils/authorizedFetch';

export const PaymentResult = () => {
  const [error, setError] = useState('');
  const paymentResult = window.location.href.includes('success')
    ? 'Successful'
    : 'Failed';

  useEffect(() => {
    updatePaymentStatus();
  }, []);

  const updatePaymentStatus = async () => {
    const sessionId = new URLSearchParams(window.location.search).get(
      'session_id'
    );
    const paymentId = new URLSearchParams(window.location.search).get(
      'payment_id'
    );
    const paymentUrl = `${process.env.REACT_APP_API_URL}/checkout/update-status`;
    const body = { sessionId, paymentId };
    try {
      await authorizedFetch(paymentUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      setError('There was an error with the request');
    }
  };

  return (
    <div>
      <ToastContainer
        className='p-3'
        position='top-center'
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setError('')}
          show={error !== ''}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className='me-auto'>Products</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
      <h1>Payment {paymentResult}</h1>
    </div>
  );
};
