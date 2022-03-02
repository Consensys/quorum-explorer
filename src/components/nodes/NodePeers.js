import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { PeopleFill } from 'react-bootstrap-icons';


function NodePeers(){

  return (
    <Card >
      <Card.Body>
        <Row className="cCenterAlign">
          <Col sm={4}>
            <PeopleFill color="red" size={48} />
          </Col>
          <Col sm={8} >
            <Card.Title>Peers</Card.Title>
            <Card.Text>5</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

}

export default NodePeers;



