import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './LogIn.css';

function LogIn() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      const loginUrl = `${process.env.REACT_APP_API_URL}/auth/login`;
      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          return setError('Invalid credentials');
        }
        localStorage.setItem('token', data.data.token);
        window.location.href = '/';
      } catch {
        setError('There was an error with the request');
      }
    }
  };

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
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

      <Card id='login-container'>
        <Card.Body>
          <Card.Title>Log In</Card.Title>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group as={Col} md='12'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type='email'
                  name='email'
                  placeholder='example@mail.com'
                  value={credentials.email}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  Email is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} md='12'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type='password'
                  name='password'
                  value={credentials.password}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  Passsword is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row style={{ textAlign: 'center' }}>
              <Form.Text>
                Don&rsquo;t have an account? <a href='/signup'>Sign up</a>
              </Form.Text>
            </Row>
            <Row>
              <Button type='submit'>Log in</Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LogIn;
