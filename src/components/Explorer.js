import React, { Component } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import { getLatestBlockNumber, getBlockByNumber } from './services/common_api_calls';
import Block from './explorer/Block';
const nodesConfig = require('../config/nodes.json');
const nodeKeys = Object.keys(nodesConfig);

class Explorer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      delay: 5000,
      blockNumber: 0,
      transactions: [],
      blocks: [],
    }
  }

  updateArray = (arr, elem, len) => { 
    arr.unshift(elem);
    return arr.slice(0, len);
  }


  async getBlockByNumber() {
    console.log("getLatestBlockNumber");
    const rpcUrl = nodesConfig['rpcnode'].rpcUrl;
    const res = await getBlockByNumber(rpcUrl, 'latest');
    var tmpBlocks = this.updateArray(this.state.blocks, res.number, 5);
    console.log('tmpBlocks: '+ JSON.stringify(tmpBlocks, null, 2));

    this.setState({ blockNumber: res.number, blocks: tmpBlocks });
    console.log('State: '+ JSON.stringify(this.state, null, 2));
  }

  tick = () => {
    this.getBlockByNumber();
  }

  // content visible on screen
  async componentDidMount() {
    console.log("component rendered to screen");
    this.interval = setInterval(this.tick, this.state.delay);
    this.getBlockByNumber();
  }

  // sit and wait to updates from setState
  componentDidUpdate() {
    console.log("component just updated and re rendered");
  }

  // sit and wait till component is no longer shown
  componentWillUnmount() {
    console.log("component gone off screen");
    clearInterval(this.interval);
  }

  // shouldComponentUpdate(){}
  // getSnapshotBeforeUpdate(){}

  render() {
    // const handleSelectNode = (e) => {
    //   console.log(e);
    //   // this.nodeInfoHandler(e);
    // }
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
