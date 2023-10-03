import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import AddProduct from '../AddProduct/AddProduct';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Navbar expand='lg' id='navbar'>
      <AddProduct open={open} setOpen={setOpen} />
      <Container fluid>
        <Navbar.Brand>Productos</Navbar.Brand>
        <Nav
          className='me-auto my-2 my-lg-0'
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link onClick={()=>setOpen(true)}>Crear producto</Nav.Link>
        </Nav>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search'
            className='me-2'
            aria-label='Search'
          />
          <Button id='search-btn'>Search</Button>
        </Form>
        <Nav
          className='my-2 my-lg-0'
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link onClick={logout}>Log out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
