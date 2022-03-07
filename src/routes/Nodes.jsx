import React, { Component } from "react";
import PageHeader from "../components/Header/PageHeader";
import StatCard from "../components/Card/StatCard";
import NodeData from "../components/NodeData/NodeData";
import { updateNodeInfo } from "../components/services/common_api_calls";

import { FaPlay, FaStop } from "react-icons/fa";
import { GiCube } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { VscArrowSwap } from "react-icons/vsc";

const nodesConfig = require("../config/nodes.json");
const nodeKeys = Object.keys(nodesConfig);

export default class Nodes extends Component {
  constructor(props) {
    super(props);
    this.handler = this.childHandler.bind(this);
    this.state = {
      delay: 1000,
      client: nodeKeys[0].client,
      selectedNode: nodeKeys[0],
      nodeId: "",
      nodeName: "",
      enode: "",
      ip: "127.0.0.1",
      rpcUrl: "http://127.0.0.1:8545",
      statusText: "error",
      blocks: 0,
      peers: 0,
      queuedTxns: 0,
      pendingTxns: 0,
    };
  }

  childHandler = (dropDownNode) => {
    console.log(dropDownNode);
    this.setState({
      selectedNode: dropDownNode.target.value,
    });
  };

  async nodeInfoHandler(node) {
    // console.log("nodeInfoHandler");
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
    });
    // console.log('State: '+ JSON.stringify(this.state, null, 2));
  }

  tick = () => {
    this.nodeInfoHandler(this.state.selectedNode);
  };

  // content visible on screen
  async componentDidMount() {
    console.log("component rendered to screen");
    this.interval = setInterval(this.tick, this.state.delay);
    this.nodeInfoHandler(this.state.selectedNode);
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

  render() {
    const cards = [
      {
        label: "Status",
        value: this.state.statusText === "OK" ? "Running" : "Stopped",
        icon:
          this.state.statusText === "OK" ? (
            <FaPlay size="1.5em" />
          ) : (
            <FaStop size="1.5em" />
          ),
      },
      {
        label: "Blocks",
        value: this.state.blocks,
        icon: <GiCube size="2em" />,
      },
      {
        label: "Peers",
        value: this.state.peers,
        icon: <BsFillPeopleFill size="2em" />,
      },
      {
        label: "Queued",
        value: this.state.queuedTxns,
        icon: <VscArrowSwap size="2em" />,
      },
    ];
    return (
      <>
        <PageHeader HeadingName="Nodes" />
        <StatCard cards={cards} />
        <NodeData
          childHandler={this.childHandler}
          selectedNode={this.state.selectedNode}
          client={this.state.client}
          nodeId={this.state.nodeId}
          nodeName={this.state.nodeName}
          enode={this.state.enode}
          rpcUrl={this.state.rpcUrl}
          ip={this.state.ip}
        />
      </>
    );
  }
}
