import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { ReactElement } from "react";

interface IProps {
  title: string,
  text: string|number,
  icon: ReactElement;
}

interface IState {
}

class NodeCard extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }
  
  render(){
    return (
      <Card >
        <Card.Body>
          <Row className="cCenterAlign">
            <Col sm={4}>
              {this.props.icon}
            </Col>
            <Col sm={8}>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Text>{this.props.text}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default NodeCard;



