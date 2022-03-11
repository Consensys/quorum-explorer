import React, { Component } from "react";
import { Container, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Box, Text, HStack } from "@chakra-ui/react";
import { Flex, Spacer, Center } from '@chakra-ui/react'
import ExplorerBlocks from "../Explorer/ExplorerBlocks";
import PageHeader from "../Misc/PageHeader";
import { QuorumBlock } from "../Types/Explorer";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { getDetailsByNodeName, getNodeKeys } from "../API/QuorumConfig";
import { getBlockByNumber } from "../API/Explorer";

interface IProps {
  config: QuorumConfig;
}

interface IState {
  delay: number;
  blockNumber: number;
  transactions: string[];
  blocks: QuorumBlock[];
  selectedNode: string;
}

export class Explorer extends Component<IProps, IState> {
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
    if (arr[0] === elem) {
    } else {
      arr.unshift(elem);
    }
    return arr.slice(0, len);
  };

  async nodeInfoHandler(name: string) {
    const needle: QuorumNode = getDetailsByNodeName(this.props.config, name);
    const rpcUrl: string = needle.rpcUrl;
    const quorumBlock = await getBlockByNumber(rpcUrl, "latest");
    var tmpBlocks = this.updateArray(this.state.blocks, quorumBlock, 4);
    this.setState({
      selectedNode: name,
      blockNumber: quorumBlock.number,
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

  handleSelectNode = (e: any) => {
    console.log(e);
    // this.nodeInfoHandler(e);
  };

  render() {
    return (
      <>

        <Container maxW={{ base: "container.sm", md: "container.xl" }}>
          <PageHeader
            title="Explorer"
            config={this.props.config}
            selectNodeHandler={this.handleSelectNode}
          />
          <ExplorerBlocks blocks={this.state.blocks}  />
         
        </Container>
      </>
    );
  }
}

export default Explorer;
