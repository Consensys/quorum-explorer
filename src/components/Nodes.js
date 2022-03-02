import React, { Component } from 'react';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
const nodesConfig = require('../config/nodes.json');

function Nodes(){
  const nodeKeys = Object.keys(nodesConfig);


  return (
    <Container className="container-fluid vh-100">
    <Row>
    <h2> Nodes</h2>
    </Row>
    
    <Row>
      <Tabs defaultActiveKey="{{nodes[0]}}">
        {nodeKeys.map((node) => (
          <Tab eventKey={node} title={node}>
            Hi, I am {node} tab content. {nodesConfig[node]['client']}
          </Tab>
        ))}
      </Tabs>
 
    </Row>
    
    </Container>
  );
  
}

export default Nodes;
