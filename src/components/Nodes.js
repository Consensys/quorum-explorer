import React, { Component } from 'react';
import NodeStatus from './nodes/NodeStatus';
import NodePeers from './nodes/NodePeers';
import NodeBlocks from './nodes/NodeBlocks';
import NodeTxns from './nodes/NodeTxns';
import NodeInfo from './nodes/NodeInfo';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';

const nodesConfig = require('../config/nodes.json');

function Nodes(){
  const nodeKeys = Object.keys(nodesConfig);
  return (
    <Container className="container-fluid vh-100">
    <Row><p></p></Row>
    <Row>
    <h2>Nodes</h2>
    </Row>
    
    <Row>
      <Tabs defaultActiveKey={nodeKeys[0]}>
        {nodeKeys.map((node) => (
          <Tab key={node} eventKey={node} title={node}>

            <Row> <p></p> </Row>

            <Row>
              <Col sm={3}><NodeStatus node={node} status="running"/></Col>
              <Col sm={3}><NodePeers node={node} peers="5" /></Col>
              <Col sm={3}><NodeBlocks node={node} blocks="100" /></Col>
              <Col sm={3}><NodeTxns node={node} txns="0" /></Col>
            </Row>

            <Row> <p></p> </Row>

            <Row>
              <Col>
                <NodeInfo node={node}/>
              </Col>
            </Row>

          </Tab>
        ))}
      </Tabs>
 
    </Row>
    
    </Container>
  );
  
}

export default Nodes;
