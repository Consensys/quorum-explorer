import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { ArrowDownUp } from 'react-bootstrap-icons';
const nodesConfig = require('../../config/nodes.json');

function NodeTxns(props){

  const node = props.node;
  const txns = props.txns;

  return (
    <Card >
      <Card.Body>
        <Row className="cCenterAlign">
          <Col sm={4}>
            <ArrowDownUp color="orangered" size={48} />
          </Col>
          <Col sm={8}>
            <Card.Title>Queued Txns</Card.Title>
            <Card.Text>{txns}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

}

export default NodeTxns;



