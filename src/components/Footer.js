import * as React from 'react';
import {Container, Row, Col, Card, ListGroup} from 'react-bootstrap';
const nodesConfig = require('../config/nodes.json');

function Footer() {

  return (
      <div className="bg-dark text-white">
      <Container fluid="md">
        <Row >
          <Col>
          <Card style={{ width: '18rem' }} className="bg-dark text-white border-0">
          <Card.Body>
            <Card.Title className="bg-dark text-white">Resources</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-white" action href="https://besu.hyperledger.org/en/latest/">Hyperledger Besu</ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/docs/goquorum/en/latest/">GoQuorum</ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white" action href="https://docs.tessera.consensys.net/en/latest/">Tessera</ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white" action href="https://docs.orchestrate.consensys.net/en/latest/">Codefi Orchestrate</ListGroup.Item>
              </ListGroup>
          </Card.Body>
          </Card>
          </Col>

          <Col>
            <Card style={{ width: '18rem' }} className="bg-dark text-white border-0">
              <Card.Body>
                <Card.Title className="bg-dark text-white">Resources</Card.Title>
                  <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/academy/">Academy</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/knowledge-base/">Blockchain Knowledge Hub</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/enterprise-ethereum/">Blockchain for Business</ListGroup.Item>
                  </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '18rem' }} className="bg-dark text-white border-0">
              <Card.Body>
                <Card.Title className="bg-dark text-white">Resources</Card.Title>
                  <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/academy/">Academy</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/knowledge-base/">Blockchain Knowledge Hub</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/enterprise-ethereum/">Blockchain for Business</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/professional-services/">Professional Services</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white" action href="https://consensys.net/contact/">Contact</ListGroup.Item>
                  </ListGroup>
              </Card.Body>
            </Card>
          </Col>
      </Row>

      <Row>
      Ⓒ Copyright Consensys 2022
      </Row>

      </Container>
      </div>

  );
};
export default Footer;
