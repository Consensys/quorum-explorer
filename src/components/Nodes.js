import React, { Component } from 'react';
import NodeStatus from './nodes/NodeStatus';
import NodePeers from './nodes/NodePeers';
import NodeBlocks from './nodes/NodeBlocks';
import NodeTxns from './nodes/NodeTxns';
import NodeInfo from './nodes/NodeInfo';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import { updateNodeInfo } from './services/common_api_calls';
const nodesConfig = require('../config/nodes.json');
const nodeKeys = Object.keys(nodesConfig);

class Nodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      client: nodeKeys[0].client,
      selectedNode: nodeKeys[0],
      nodeId: '',
      nodeName: '',
      enode: '',
      ip: '127.0.0.1',
      rpcUrl: 'http://127.0.0.1:8545',
      statusText: "error",
      blocks: 0,
      peers: 0,
      queuedTxns: 0,
      pendingTxns: 0,
    }
  }

  async nodeInfoHandler(node) {
    console.log(">>>>> nodeInfoHandler")
    const rpcUrl = nodesConfig[node].rpcUrl
    const res = await updateNodeInfo(rpcUrl)
    this.setState({
      client: nodesConfig[node].client,
      selectedNode: node,
      statusText: res.statusText,
      nodeId: res.nodeId,
      nodeName: res.nodeName,
      enode: res.enode,
      ip: res.ip,
      rpcUrl: rpcUrl,
      blocks: res.blocks,
      peers: res.peers,
    })
    // console.log('State: '+ JSON.stringify(this.state, null, 2));
  }

  // content visible on screen
  async componentDidMount() {
    console.log("component rendered to screen");
    await this.nodeInfoHandler(this.state.selectedNode);
  }

  // sit and wait to updates from setState
  componentDidUpdate() {
    console.log("component just updated and re rendered");
  }

  // sit and wait till component is no longer shown
  componentWillUnmount() {
    console.log("component gone off screen");
  }

  // shouldComponentUpdate(){}
  // getSnapshotBeforeUpdate(){}

  render() {
    const handleSelectNode = (e) => {
      console.log(e);
      this.nodeInfoHandler(e);
    }
    return (
      <Container className="container-fluid vh-100">
        <br />
        <Row>
          <Row>
            <Col sm={11}>
              <h2>Nodes</h2>
            </Col>
            <Col sm={1}>
              <Dropdown onSelect={handleSelectNode}>
                <Dropdown.Toggle variant="secondary" id="dropdown-node-menu" >
                  <Sliders size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {nodeKeys.map((node) => (
                    <Dropdown.Item key={node} eventKey={node}>{node}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Row>
        <br />
        <Row>
          <br />
          <Row>
            <Col sm={3}><NodeStatus name={this.state.selectedNode} statusText={this.state.statusText} /></Col>
            <Col sm={3}><NodePeers peers={this.state.peers} /></Col>
            <Col sm={3}><NodeBlocks blocks={this.state.blocks} /></Col>
            <Col sm={3}><NodeTxns txns={this.state.queuedTxns} /></Col>
          </Row>

          <Row><p> </p></Row>

          <Row>
            <Col>
              <NodeInfo name={this.state.selectedNode} client={this.state.client} nodeId={this.state.nodeId} nodeName={this.state.nodeName} enode={this.state.enode} rpcUrl={this.state.rpcUrl} ip={this.state.ip} />
            </Col>
          </Row>
        </Row>

      </Container>
    );
  }
}

export default Nodes;
