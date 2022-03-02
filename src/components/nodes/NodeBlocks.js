import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { Boxes } from 'react-bootstrap-icons';


function NodePeers(){

  return (
    <Card >
      <Card.Body>
        <Row className="cCenterAlign">
          <Col sm={4}>
            <Boxes color="royalblue" size={48} />
          </Col>
          <Col sm={8}>
            <Card.Title>Blocks</Card.Title>
            <Card.Text>20</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

}

export default NodePeers;



