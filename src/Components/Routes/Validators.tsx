import React, { Component } from "react";
import { Heading, Divider, Container } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { ValidatorsActive } from "../Validators/ValidatorsActive";
import { ValidatorsPending } from "../Validators/ValidatorsPending";
import { ValidatorsPropose } from "../Validators/ValidatorsPropose";
import { getCurrentValidators } from "../API/Validators";
import { getDetailsByNodeName, getNodeKeys } from "../API/QuorumConfig";
import { updateNodeInfo } from "../API/Nodes";

// Check consensus mechanism -- will then depend on what APIs we use
// getPendingVotes, getValidatorsByBlockNumber, proposeValidatorVote (QBFT, Clique, IBFT2)
// https://consensys.net/docs/goquorum/en/latest/reference/api-methods/#istanbul_getvalidators
// https://consensys.net/docs/goquorum/en/latest/reference/api-methods/#raft_leader

// UI: Current list of validators (button for revoking?), any pending votes (with button to discard pending vote), list of non-validators with buttons to propose new validator

interface IProps {
  config: QuorumConfig;
}

interface IState {
  delay: number;
  client: string;
  selectedNode: string;
  rpcUrl: string;
  statusText: string;
  blocks: number;
  minersList: Set<string>[];
}

export default class Validators extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedNode: this.props.config.nodes[0].name,
      delay: 1000,
      client: "",
      rpcUrl: this.props.config.nodes[0].rpcUrl,
      statusText: "error",
      blocks: 0,
      minersList: [],
    };
  }
  intervalId: number = 0;

  handleSelectNode = (e: any) => {
    console.log(e);
    this.setState({
      selectedNode: e.target.value,
    });
  };

  async nodeInfoHandler(node: string) {
    const needle: QuorumNode = getDetailsByNodeName(this.props.config, node);
    const rpcUrl: string = needle.rpcUrl;
    const res = await updateNodeInfo(rpcUrl);
    const currentValidators = await getCurrentValidators(
      rpcUrl,
      this.props.config.algorithm
    );
    this.setState({
      client: needle.client,
      selectedNode: node,
      statusText: res.statusText,
      rpcUrl: rpcUrl,
      blocks: res.blocks,
      minersList: currentValidators,
    });
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

  render() {
    console.log(this.state.selectedNode);
    return (
      <>
        <Container maxW={{ base: "container.sm", md: "container.xl" }}>
          <PageHeader
            title="Validators"
            config={this.props.config}
            selectNodeHandler={this.handleSelectNode}
          />
          <ValidatorsActive
            config={this.props.config}
            minersList={this.state.minersList}
          />
          <ValidatorsPending />
          <ValidatorsPropose />
        </Container>
      </>
    );
  }
}
