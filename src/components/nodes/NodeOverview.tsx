import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { NodeStat } from '../types/nodes';
import NodeCard from '../nodes/NodeCard';
import { stat } from 'fs';

interface IProps {
  stats: NodeStat[];
}

interface IState {
}

class NodeOverview extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }
  
  render(){
    return (
      <Row>
      {this.props.stats.map(({ title, text, icon }) => (
        <Col key={title} sm={12/this.props.stats.length}>
          <NodeCard  title={title} text={text} icon={icon}/>
        </Col>
      ))}
      </Row>
    );
  }
}

export default NodeOverview;



