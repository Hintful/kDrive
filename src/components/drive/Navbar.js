import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (  
    <Navbar
      bg="light" expand="lg"
    >
      <Navbar.Brand as={Link} to="/">
        <span className="emphasis"><i className="fas fa-code title-logo"></i> k</span>Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>

    </Navbar>
  );
}
 
export default NavbarComponent;