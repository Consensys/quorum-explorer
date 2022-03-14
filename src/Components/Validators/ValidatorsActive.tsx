import React, { Component } from "react";
import { Heading, Divider, Container, Flex, Text } from "@chakra-ui/react";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";

interface IProps {
  config: QuorumConfig;
  minersList: Set<string>[];
}

interface IState {}

export class ValidatorsActive extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Heading>Active Validators</Heading>
        {this.props.minersList.map((miner) => (
          <Text>{miner}</Text>
        ))}
      </>
    );
  }
}

export default ValidatorsActive;
