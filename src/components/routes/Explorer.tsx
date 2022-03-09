import React, { Component } from "react";
import { Heading } from "@chakra-ui/react";
import PageHeader from "../header";
import { QuorumConfig, QuorumNode } from "../types/config";
import { getDetailsByNodeName, getNodeKeys } from "../api/quorumConfig";
import { getBlockByNumber } from "../api/explorer";

interface IProps {
  config: QuorumConfig;
}

interface IState {
  delay: number;
  blockNumber: number;
  transactions: string[];
  blocks: number[];
  selectedNode: string;
}

export default class Explorer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      delay: 5000,
      blockNumber: 0,
      transactions: [],
      blocks: [],
      selectedNode: this.props.config.nodes[0].name,
    };
  }

  intervalId: number = 0;
  nodeKeys: string[] = getNodeKeys(this.props.config);

  //get the latest n elements in an array
  updateArray = <T,>(arr: T[], elem: T, len: number) => {
    arr.unshift(elem);
    return arr.slice(0, len);
  };

  async nodeInfoHandler(name: string) {
    const needle: QuorumNode = getDetailsByNodeName(this.props.config, name);
    const rpcUrl: string = needle.rpcUrl;
    const res = await getBlockByNumber(rpcUrl, "latest");
    var tmpBlocks = this.updateArray(this.state.blocks, res.number, 5);
    this.setState({
      selectedNode: name,
      blockNumber: res.number,
      blocks: tmpBlocks,
    });
    console.log("State: " + JSON.stringify(this.state, null, 2));
  }

  tick = () => {
    this.nodeInfoHandler(this.state.selectedNode);
  };

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
    return (
      <>
        <PageHeader headingName="Explorer" />
      </>
    );
  }
}
