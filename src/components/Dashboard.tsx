import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import NodeBlocks from './nodes/NodeBlocks';

interface IProps {
}

interface IState {
  blocks: number;
}

class Dashboard extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
    this.state = { 
      blocks: 0,
    }
  }

  render(){
    return (
      <Container className="container-fluid vh-100">
      <br/>
      <Row>
      <h2> Dashboard</h2>
      </Row>

      <Row>
      <Col sm={3}><NodeBlocks blocks={this.state.blocks} /></Col>
      </Row>

      </Container>
    );
  }
}

export default Dashboard;
