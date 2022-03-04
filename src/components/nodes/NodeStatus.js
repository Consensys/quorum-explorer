import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { PatchQuestionFill, PlayFill } from 'react-bootstrap-icons';

class NodesCard extends Component{

  constructor(props){
    super(props);
    this.state = { 
      status : this.props.status
    }
  }

  render(){
    const isRunningStatus = (this.state.status === "OK")
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
              <Card.Text className='cCapitalize'>{this.state.status}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

}

export default NodesCard;



