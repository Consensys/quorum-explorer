import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { PatchQuestionFill, PlayFill } from 'react-bootstrap-icons';

class NodesCard extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const isRunningStatus = (this.props.statusText === "OK")
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
              <Card.Text>{this.props.name}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

}

export default NodesCard;



