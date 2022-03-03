import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { PeopleFill } from 'react-bootstrap-icons';

class NodePeers extends Component{

  constructor(props){
    super(props);
    this.state = { 
      peers : this.props.peers
    }
  }

  render(){
    return (
      <Card >
        <Card.Body>
          <Row className="cCenterAlign">
            <Col sm={4}>
              <PeopleFill color="DimGray" size={48} />
            </Col>
            <Col sm={8} >
              <Card.Title>Peers</Card.Title>
              <Card.Text>{this.state.peers}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

}

export default NodePeers;



