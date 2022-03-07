import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { ArrowDownUp } from 'react-bootstrap-icons';

interface IProps {
  txns: number;
}

interface IState {
}

class NodeTxns extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }

  render(){
    return (
      <Card >
        <Card.Body>
          <Row className="cCenterAlign">
            <Col sm={4}>
              <ArrowDownUp color="orangered" size={48} />
            </Col>
            <Col sm={8}>
              <Card.Title>Queued Txns</Card.Title>
              <Card.Text>{this.props.txns}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default NodeTxns;



