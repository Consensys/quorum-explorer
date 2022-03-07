import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { Boxes } from 'react-bootstrap-icons';

interface IProps {
  number: number
}

interface IState {
}

class Block extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }
 
  render(){
    return (
      <Card >
        <Card.Body>
          <Card.Title>Blocks</Card.Title>
          <Card.Text>{this.props.number}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Block;



