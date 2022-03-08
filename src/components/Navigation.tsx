import React, { Component } from 'react';
import {Container, Navbar, Nav, Dropdown, NavDropdown} from 'react-bootstrap';


interface IProps {
}

interface IState {
}


class Navigation extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }
  
  pages: string[] = ['Dashboard', 'Nodes', 'Explorer', 'Contracts'];

  render (){
    return (
      <Navbar bg="dark" variant="dark" expand="xl">
        <Container>
        <Navbar.Brand href="#home">
        <img
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Quorum Explorer logo"
        /> Quorum Explorer     
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              {this.pages.map((page) => (
              <Nav.Link key={page} href={`${page}`}>{page}</Nav.Link>
              ))}
            </Nav>
      
          </Navbar.Collapse>
      
        </Container>
      </Navbar>
    );
  }
};
export default Navigation;
