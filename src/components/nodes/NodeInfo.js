import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';



// Generic card to show a single piece of info eg chain head, peer count etc

function NodeTxns(){

  return (
    
    <Card >
      <Card.Body>
        <Row>
          <Card.Title>Node Info</Card.Title>
        </Row>
        <Row>
          <Container>
          <Row>
            <Col md={2}><Card.Text className="cBold">Client</Card.Text></Col>
            <Col md={10}><Card.Text className="text-truncate">Besu</Card.Text></Col>
          </Row>
          <Row>
            <Col md={2}><Card.Text className="cBold">Node ID</Card.Text></Col>
            <Col md={10}><Card.Text className="text-truncate">87ec35d558352cc55cd1bf6a472557797f91287b78fe5e86760219124563450ad1bb807e4cc61e86c574189a851733227155551a14b9d0e1f62c5e11332a18a3</Card.Text></Col>
          </Row>
          <Row>
            <Col md={2}><Card.Text className="cBold">Node Name</Card.Text></Col>
            <Col md={10}><Card.Text className="text-truncate">besu/v1.0.1-dev-0d2294a5/osx-x86_64/oracle-java-1.8</Card.Text></Col>
          </Row>
          <Row>
            <Col md={2}><Card.Text className="cBold">Enode</Card.Text></Col>
            <Col md={10}><Card.Text className="text-truncate">enode://87ec35d558352cc55cd1bf6a472557797f91287b78fe5e86760219124563450ad1bb807e4cc61e86c574189a851733227155551a14b9d0e1f62c5e11332a18a3@172.16.239.11:30303"</Card.Text></Col>
          </Row>
          <Row>
            <Col md={2}><Card.Text className="cBold">RPC URL</Card.Text></Col>
            <Col md={10}><Card.Text className="text-truncate">http://172.16.239.11:8545</Card.Text></Col>
          </Row>
          <Row>
            <Col md={2}><Card.Text className="cBold">IP</Card.Text></Col>
            <Col md={10}><Card.Text className="text-truncate">172.16.239.11</Card.Text></Col>
          </Row>
          </Container>          
        </Row>
      </Card.Body>
    </Card>

  );

}

export default NodeTxns;



