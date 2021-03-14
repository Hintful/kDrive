import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

const NavbarComponent = () => {
  return (  
    <Navbar
      bg="light" expand="lg"
    >
      <Navbar.Brand as={Link} to=""
        onClick={() => {
          ReactGA.event({
            category: 'kDrive',
            action: 'Clicked on Main Logo'
          });
        }}
      >
        <span className="emphasis"><i className="fas fa-code title-logo"></i> k</span>Drive
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/user" className="btn btn-outline-secondary p-2"
          onClick={() => {
            ReactGA.event({
              category: 'kDrive',
              action: 'Clicked on Profile button'
            });
          }}
        >
          <i className="fas fa-user"></i> Profile
        </Nav.Link>
      </Nav>

    </Navbar>
  );
}
 
export default NavbarComponent;