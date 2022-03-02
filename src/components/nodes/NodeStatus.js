import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { PatchQuestionFill, PlayFill } from 'react-bootstrap-icons';



// Generic card to show a single piece of info eg chain head, peer count etc

function NodesCard(){

  return (
    <Card >
      <Card.Body>
        <Row className="cCenterAlign">
          <Col sm={4}>
            <PlayFill color="green" size={48} />
          </Col>
          <Col sm={8} className="cCenterAlign">
            <Card.Title>Status</Card.Title>
            <Card.Text>Running</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

}

export default NodesCard;



