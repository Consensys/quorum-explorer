import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { Boxes } from 'react-bootstrap-icons';

interface IProps {
  blocks: number
}

interface IState {
}

class NodeBlocks extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }
  
  render(){
    return (
      <Card >
        <Card.Body>
          <Row className="cCenterAlign">
            <Col sm={4}>
              <Boxes color="RoyalBlue" size={48} />
            </Col>
            <Col sm={8}>
              <Card.Title>Blocks</Card.Title>
              <Card.Text>{this.props.blocks}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default NodeBlocks;



