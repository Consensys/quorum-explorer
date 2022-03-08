import React, { Component } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { getBlockByNumber } from '../api/explorer';
import Block from '../explorer/Block';
const config = require('../../config/config.json');
const nodesConfig = config.nodes;
const nodeKeys = Object.keys(nodesConfig);

interface IProps {
}

interface IState {
    delay: number,
    blockNumber: number,
    transactions: string[],
    blocks: number[],
}

class Explorer extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      delay: 5000,
      blockNumber: 0,
      transactions: [],
      blocks: [],
    }
  }
  //timer
  intervalId: number = 0;

  //get the latest n elements in an array
  updateArray = <T,>(arr:T[], elem:T, len:number) => { 
    arr.unshift(elem);
    return arr.slice(0, len);
  }

  async getBlockByNumber() {
    const rpcUrl = nodesConfig['rpcnode'].rpcUrl;
    const res = await getBlockByNumber(rpcUrl, 'latest');
    var tmpBlocks = this.updateArray(this.state.blocks, res.number, 5);
    this.setState({ blockNumber: res.number, blocks: tmpBlocks });
    console.log('State: '+ JSON.stringify(this.state, null, 2));
  }

  tick = () => {
    this.getBlockByNumber();
  }

  // content visible on screen
  async componentDidMount() {
    console.log("component rendered to screen");
    this.intervalId = window.setInterval(this.tick, this.state.delay);
    this.getBlockByNumber();
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
    return (
      <Container className="container-fluid vh-100">
        <br />
        <Row>
          <Row>
            <Col sm={11}>
              <h2>Explorer</h2>
            </Col>
          </Row>
        </Row>
        <br />
        <Row>
          <br />
          <Row>
            <Col sm={3}><Block number={this.state.blockNumber} /></Col>

          </Row>

          <Row><p> </p></Row>
        </Row>

      </Container>
    );
  }
}

export default Explorer;
