import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { PeopleFill } from 'react-bootstrap-icons';

interface IProps {
  peers: number;
}

interface IState {
}

class NodePeers extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
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
              <Card.Text>{this.props.peers}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

}

export default NodePeers;



