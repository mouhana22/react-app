
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg"  data-bs-theme="dark">
        <div className="container">
      <Navbar.Brand as={Link} to="/">Property App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/add-property">Add Property</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
