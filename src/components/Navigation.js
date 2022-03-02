import * as React from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';

const pages = ['Dashboard', 'Nodes', 'Explorer', 'Contracts'];

function Navigation() {

  return (
  
    <Navbar bg="dark" variant="dark" expand="xl">
      <Container>
      <Navbar.Brand href="#home">Quorum Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
     
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            {pages.map((page) => (
            <Nav.Link key={page} href={`${page}`}>{page}</Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
     
      </Container>
    </Navbar>



  );
};
export default Navigation;
