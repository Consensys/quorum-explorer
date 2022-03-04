import React, { Component } from 'react';
import NodeStatus from './nodes/NodeStatus';
import NodePeers from './nodes/NodePeers';
import NodeBlocks from './nodes/NodeBlocks';
import NodeTxns from './nodes/NodeTxns';
import NodeInfo from './nodes/NodeInfo';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import {postAdminNodeInfo} from './services/goquorum_api_calls';
const nodesConfig = require('../config/nodes.json');
const nodeKeys = Object.keys(nodesConfig);

class Nodes extends Component{

  constructor(props){
    super(props);
    this.state = { 
      status: "null",
      blocks: 0,
      peers: 0,
      txns: 0
    }
  }

  // content visible on screen
  async componentDidMount(){
    console.log("component rendered to screen");
    const res = await postAdminNodeInfo('http://127.0.0.1:8545')
    this.setState(
      {
        status: res.statusText

      }
    )
  }
  // sit and wait to updates from setState
  componentDidUpdate(){
    console.log("component just updated and re rendered");

  }
  // sit and wait till component is no longer shown
  componentWillUnmount(){
    console.log("component gone off screen");
  }

  // shouldComponentUpdate(){}
  // getSnapshotBeforeUpdate(){}

  render(){
      return (
        <Container className="container-fluid vh-100">
        <br/>
        <Row>
        <h2>Nodes</h2>
        </Row>
        
        <Row>
          <Tabs defaultActiveKey={nodeKeys[0]}>
            {nodeKeys.map((node) => (
              <Tab key={node} eventKey={node} title={node}>

                <Row> <p></p> </Row>

                <Row>
                <Col sm={3}><NodeStatus status={this.state.status} /></Col>
                <Col sm={3}><NodePeers peers={this.state.peers} /></Col>
                <Col sm={3}><NodeBlocks blocks={this.state.blocks} /></Col>
                <Col sm={3}><NodeTxns txns={this.state.txns} /></Col>
              </Row>

              <br/>

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
}

export default Nodes;
