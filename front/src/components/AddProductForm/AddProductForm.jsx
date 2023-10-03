import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './AddProductForm.css';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import authotizedFetch from '../../utils/authorizedFetch';
import Button from 'react-bootstrap/esm/Button';
// import cloudinary from 'cloudinary';

//eslint-disable-next-line
const AddProductForm = ({ submited }) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [productInfo, setProductInfo] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (submited) {
      document.getElementById('add-product-btn').click();
    }
  }, [submited]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity()) {
      const registerUrl = `${process.env.REACT_APP_API_URL}/product`;
      try {
        const imageUrl = await handleUpload();
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...productInfo, imageUrl }),
        };

        const data = await authotizedFetch(registerUrl, fetchOptions);
        if (data.data.errors) {
          const errorMessages = mapErrorMessages(data.data.errors);
          return setError(errorMessages);
        }
      } catch {
        setError('There was an error with the request');
      }
      reset();
    }
  };

  const handleChange = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };

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

  const handleUpload = async () => {
    const image = document.getElementById('formImage').files[0];
    const data = new FormData();
    data.append('file', image);
    data.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append('folder', 'Momentu');
    try {
      alert('Uploading image, please wait...');
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );
      const res = await response.json();
      return res.secure_url;
    } catch (err) {
      setError('There was an error with the request');
    }
  };

  const reset = () => {
    window.location.reload();
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
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        id='add-product-container'
      >
        <Form.Group as={Col} md='12'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Red T-shirt'
            value={productInfo.title}
            onChange={handleChange}
            name='title'
          />
          <Form.Control.Feedback type='invalid'>
            Title name is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='12' className='mt-2'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as='textarea'
            rows={3}
            type='text'
            placeholder='This t-shirt is the best t-shirt ever'
            value={productInfo.description}
            onChange={handleChange}
            name='description'
          />
          <Form.Control.Feedback type='invalid'>
            Description is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='12' className='mt-2'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder="men's clothing"
            value={productInfo.category}
            onChange={handleChange}
            name='category'
          />
          <Form.Control.Feedback type='invalid'>
            Category is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Image</Form.Label>
          <Form.Control type='file' accept='image/*' required id='formImage' />
          <Form.Control.Feedback type='invalid'>
            Image is required
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' id='add-product-btn' />
      </Form>
    </div>
  );
};

export default AddProductForm;
