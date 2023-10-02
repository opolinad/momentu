import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './Register.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Register() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity()) {
      const registerUrl = `${process.env.REACT_APP_API_URL}/auth/register`;
      try {
        const response = await fetch(registerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
            isActive: true,
            roleId: 2,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          const errorMessages = mapErrorMessages(data.data.errors);
          return setError(errorMessages);
        }
        localStorage.setItem('token', data.data.token);
        window.location.href = '/';
      } catch {
        setError('There was an error with the request');
      }
    }
  };

  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
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
      <Card id='register-container'>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md='12'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='First name'
                value={userInfo.firstName}
                onChange={handleChange}
                name='firstName'
              />
              <Form.Control.Feedback type='invalid'>
                First name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='12' className='mt-2'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Last name'
                value={userInfo.lastName}
                onChange={handleChange}
                name='lastName'
              />
              <Form.Control.Feedback type='invalid'>
                Last name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='12' className='mt-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='example@mail.com'
                value={userInfo.email}
                onChange={handleChange}
                name='email'
              />
              <Form.Control.Feedback type='invalid'>
                Email is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='12' className='mt-2'>
              <Form.Label>Passsword</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Passsword'
                value={userInfo.password}
                onChange={handleChange}
                name='password'
              />
              <Form.Control.Feedback type='invalid'>
                Password is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='12' className='mt-2'>
              <Form.Label>Confirm passsword</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Confirm passsword'
                isInvalid={userInfo.password !== userInfo.confirmPassword}
                value={userInfo.confirmPassword}
                name='confirmPassword'
                onChange={handleChange}
              />
              <Form.Control.Feedback type='invalid'>
                Passwords do not match
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Button type='submit'>Register</Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
