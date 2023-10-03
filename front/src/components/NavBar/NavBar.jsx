import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import AddProduct from '../AddProduct/AddProduct';
import { SearchBar } from '../SearchBar/SearchBar';

//eslint-disable-next-line
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
        <Navbar.Brand>Products</Navbar.Brand>
        <Nav
          className='me-auto my-2 my-lg-0'
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link onClick={() => setOpen(true)}>Create product</Nav.Link>
        </Nav>
        <SearchBar />
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
