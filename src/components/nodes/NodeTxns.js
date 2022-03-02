import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { ArrowDownUp } from 'react-bootstrap-icons';



// Generic card to show a single piece of info eg chain head, peer count etc

function NodeTxns(){

  return (
    <Card >
      <Card.Body>
        <Row className="cCenterAlign">
          <Col sm={4}>
            <ArrowDownUp color="orange" size={48} />
          </Col>
          <Col sm={8}>
            <Card.Title>Queued Txns</Card.Title>
            <Card.Text>0</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

}

export default NodeTxns;



