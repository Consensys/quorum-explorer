import * as React from 'react';
import {Container, Row, Col, Card, Nav} from 'react-bootstrap';
const nodesConfig = require('../config/nodes.json');

function Footer() {

  return (
      <div className="bg-dark text-white">
      <Container fluid="md">
        <Row >
        <Nav className="me-auto ">
          <Nav.Link className="bg-dark text-white" href="https://besu.hyperledger.org/en/latest/"> Hyperledger Besu </Nav.Link>
          <Nav.Link className="bg-dark text-white" href="https://consensys.net/docs/goquorum/en/latest/"> GoQuorum </Nav.Link> 
          <Nav.Link className="bg-dark text-white" href="https://docs.tessera.consensys.net/en/latest/"> Tessera </Nav.Link>
          <Nav.Link className="bg-dark text-white" href="https://docs.orchestrate.consensys.net/en/latest/"> Codefi Orchestrate </Nav.Link>
          <Nav.Link className="bg-dark text-white" href="https://discord.com/channels/697535391594446898/"> Discord </Nav.Link>
          <Nav.Link className="bg-dark text-white" href="https://consensys.net/contact/"> Contact </Nav.Link>
          <Nav.Link className="bg-dark text-white alignRight" href="#">    Ⓒ Copyright ConsenSys 2022. </Nav.Link>
        </Nav>
        </Row>
      </Container>
      </div>

  );
};
export default Footer;
