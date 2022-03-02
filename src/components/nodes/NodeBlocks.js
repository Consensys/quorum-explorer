import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { Boxes } from 'react-bootstrap-icons';
const nodesConfig = require('../../config/nodes.json');

function NodePeers(props){

  const node = props.node;
  const blocks = props.blocks;
  
  return (
    <Card >
      <Card.Body>
        <Row className="cCenterAlign">
          <Col sm={4}>
            <Boxes color="RoyalBlue" size={48} />
          </Col>
          <Col sm={8}>
            <Card.Title>Blocks</Card.Title>
            <Card.Text>{blocks}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

}

export default NodePeers;



