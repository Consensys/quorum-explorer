import React, { Component } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import { PlayFill, PatchQuestionFill, PeopleFill, Boxes, ArrowDownUp } from 'react-bootstrap-icons';
import NodeDetails from '../nodes/NodeDetails';
import { NodeStat } from '../types/nodes';
import { updateNodeInfo } from '../api/nodes';
import NodeOverview from '../nodes/NodeOverview';
const config = require('../../config/config.json');
const nodesConfig = config.nodes;
const nodeKeys = Object.keys(nodesConfig);

interface IProps {
}

interface IState {
    delay: number,
    client: string,
    selectedNode: string,
    nodeId: string,
    nodeName: string,
    enode: string,
    ip: string,
    rpcUrl: string,
    statusText: string,
    blocks: number,
    peers: number,
    queuedTxns: number,
    pendingTxns: number,
}

class Nodes extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      delay: 10000,
      client: nodeKeys[0],
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
  //timer
  intervalId: number = 0;

  async nodeInfoHandler(node:string) {
    const rpcUrl = nodesConfig[node].rpcUrl;
    const res = await updateNodeInfo(rpcUrl);
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

  tick = () => {
    this.nodeInfoHandler(this.state.selectedNode);
  }

  // content visible on screen
  async componentDidMount() {
    console.log("component rendered to screen");
    this.intervalId = window.setInterval(this.tick, this.state.delay);
    this.nodeInfoHandler(this.state.selectedNode);
  }

  // sit and wait to updates from setState
  componentDidUpdate() {
    console.log("component just updated and re rendered");
  }

  // sit and wait till component is no longer shown
  componentWillUnmount() {
    console.log("component gone off screen");
    clearInterval(this.intervalId);
  }

  // shouldComponentUpdate(){}
  // getSnapshotBeforeUpdate(){}

  //TODO: fix type for e
  render() {
  //stats
    const stats : NodeStat[] = [
      {
        title: "Status",
        text: this.state.statusText === "OK" ? "Running" : "Stopped",
        icon:
          this.state.statusText === "OK" ? (
            <PlayFill color="green" size={48} />
          ) : (
            <PatchQuestionFill color="red" size={48} />
          ),
      },
      {
        title: "Blocks",
        text: this.state.blocks,
        icon: <Boxes color="RoyalBlue" size={48} />,
      },
      {
        title: "Peers",
        text: this.state.peers,
        icon: <PeopleFill color="DimGray" size={48} />,
      },
      {
        title: "Queued",
        text: this.state.queuedTxns,
        icon: <ArrowDownUp color="orangered" size={48} />,
      },
    ];

    const handleSelectNode = (e:any) => {
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
          <Row><NodeOverview stats={stats}></NodeOverview></Row>

          <Row><p> </p></Row>

          <Row>
            <Col>
              <NodeDetails client={this.state.client} nodeId={this.state.nodeId} nodeName={this.state.nodeName} enode={this.state.enode} rpcUrl={this.state.rpcUrl} ip={this.state.ip} />
            </Col>
          </Row>
        </Row>

      </Container>
    );
  }
}

export default Nodes;
