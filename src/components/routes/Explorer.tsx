import React, { Component } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import Block from '../explorer/Block';
import { QuorumConfig, QuorumNode } from '../types/config';
import { getNodeKeys, getDetailsByNodeName } from '../api/quorumConfig';
import { getBlockByNumber } from '../api/explorer';

interface IProps {
  config: QuorumConfig
}

interface IState {
    delay: number,
    blockNumber: number,
    transactions: string[],
    blocks: number[],
    selectedNode: string,
}

class Explorer extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      delay: 5000,
      blockNumber: 0,
      transactions: [],
      blocks: [],
      selectedNode: this.props.config.nodes[0].name,
    }
  }
  
  intervalId: number = 0;
  nodeKeys: string[] = getNodeKeys(this.props.config);

  //get the latest n elements in an array
  updateArray = <T,>(arr:T[], elem:T, len:number) => { 
    arr.unshift(elem);
    return arr.slice(0, len);
  }

  async nodeInfoHandler(name:string) {
    const needle: QuorumNode = getDetailsByNodeName(this.props.config, name)
    const rpcUrl: string = needle.rpcUrl;
    const res = await getBlockByNumber(rpcUrl, 'latest');
    var tmpBlocks = this.updateArray(this.state.blocks, res.number, 5);
    this.setState({ selectedNode: name, blockNumber: res.number, blocks: tmpBlocks });
    console.log('State: '+ JSON.stringify(this.state, null, 2));
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

  render() {
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
              <h2>Explorer</h2>
            </Col>
            <Col sm={1}>
              <Dropdown onSelect={handleSelectNode}>
                <Dropdown.Toggle variant="secondary" id="dropdown-node-menu" >
                  <Sliders size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.nodeKeys.map((node) => (
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
          
          <Col sm={3}><Block number={this.state.blockNumber} /></Col>

          <Row><p> </p></Row>

          <Row>
          </Row>
        </Row>

      </Container>
    );
  }
}

export default Explorer;
