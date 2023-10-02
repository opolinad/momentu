import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './CardContainer.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import authorizedFetch from '../../utils/authorizedFetch';

const CardContainer = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const productUrl = `${process.env.REACT_APP_API_URL}/product`;
    try {
      const data = await authorizedFetch(productUrl);
      if (data.data.errors) {
        const errorMessages = mapErrorMessages(data.data.errors);
        return setError(errorMessages);
      }
      setProducts(data.data.products.rows);
    } catch (error) {
      setError('There was an error with the request');
    }
  }

  const mapErrorMessages = (errors) => {
    let errorMessages = null;
    for (const property in errors) {
      errorMessages = (
        <>
          {errorMessages}
          <br />
          {errors[property].join(<br />)}
        </>
      );
    }
    errorMessages = <p> {errorMessages} </p>;
    return errorMessages;
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
            <strong className='me-auto'>Login</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
      <h3 id="cards-container-title">Productos</h3>
      <div id='cards-container'>
        {products.map((product) => (
          <Card className='card' key={product.title}>
            <Card.Img variant='top' src={product.imageUrl} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
