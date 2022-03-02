import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { PatchQuestionFill, PlayFill } from 'react-bootstrap-icons';
const nodesConfig = require('../../config/nodes.json');

function NodesCard(props){

  const node = props.node;
  const status = props.status;
  const isRunningStatus = (status === "running")
  
  return (
    <Card >
      <Card.Body>
        <Row className="cCenterAlign">
          <Col sm={4}>
            {isRunningStatus ? (
              <PlayFill color="green" size={48} />
            ) : (
              <PatchQuestionFill color="red" size={48} />
            )}
          </Col>
          <Col sm={8} className="cCenterAlign">
            <Card.Title>Status</Card.Title>
            <Card.Text className='cCapitalize'>{status}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

}

export default NodesCard;



