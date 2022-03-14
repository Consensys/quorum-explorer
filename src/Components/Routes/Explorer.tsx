import React, { Component } from "react";
import { Container, Divider } from "@chakra-ui/react";
import ExplorerBlocks from "../Explorer/ExplorerBlocks";
import PageHeader from "../Misc/PageHeader";
import { QuorumBlock, QuorumTxn } from "../Types/Explorer";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { getDetailsByNodeName, getNodeKeys } from "../API/QuorumConfig";
import { getBlockByNumber } from "../API/Explorer";
import ExplorerTxns from "../Explorer/ExplorerTxns";

interface IProps {
  config: QuorumConfig;
}

interface IState {
  delay: number;
  blockNumber: number;
  transactions: QuorumTxn[];
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
  updateBlockArray = (arr: QuorumBlock[], elem: QuorumBlock, len: number) => {
    if (arr.length > 0 && arr[0]["number"] === elem["number"]) {
    } else {
      arr.unshift(elem);
    }
    return arr.slice(0, len);
  };

  updateTxnArray = (arr: QuorumTxn[], elems: QuorumTxn[], len: number) => {
    elems.map((_) => arr.unshift(_));
    var set = new Set(arr);
    arr = Array.from(set);
    return arr.slice(0, len);
  };

  async nodeInfoHandler(name: string) {
    const needle: QuorumNode = getDetailsByNodeName(this.props.config, name);
    const rpcUrl: string = needle.rpcUrl;
    const quorumBlock = await getBlockByNumber(rpcUrl, "latest");
    var tmpTxns: QuorumTxn[] = this.state.transactions;
    if (quorumBlock.transactions.length > 0) {
      tmpTxns = this.updateTxnArray(
        this.state.transactions,
        quorumBlock.transactions,
        4
      );
    }
    var tmpBlocks = this.updateBlockArray(this.state.blocks, quorumBlock, 4);
    this.setState({
      selectedNode: name,
      blockNumber: quorumBlock.number,
      blocks: tmpBlocks,
      transactions: tmpTxns,
    });
    // console.log("State: " + JSON.stringify(this.state.transactions, null, 2));
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
    this.setState({
      selectedNode: e.target.value,
    });
    // this.nodeInfoHandler(e);
  };

  render() {
    return (
      <>
        <Container maxW={{ base: "container.sm", md: "container.xl" }} p={0}>
          <PageHeader
            title="Explorer"
            config={this.props.config}
            selectNodeHandler={this.handleSelectNode}
          />
          <ExplorerBlocks
            blocks={this.state.blocks}
            url={
              getDetailsByNodeName(this.props.config, this.state.selectedNode)
                .rpcUrl
            }
          />
          <Divider />
          <ExplorerTxns
            txns={this.state.transactions}
            url={
              getDetailsByNodeName(this.props.config, this.state.selectedNode)
                .rpcUrl
            }
          />
        </Container>
      </>
    );
  }
}

export default Explorer;
