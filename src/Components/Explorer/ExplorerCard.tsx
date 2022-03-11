import React, { Component, ReactElement } from "react";
import { Divider, VStack, Flex, Text, } from "@chakra-ui/react";
import { QuorumBlock } from "../Types/Explorer";
import { getSecsAgo } from '../API/Explorer';
import ExplorerBlockDetails from "./ExplorerBlockDetails";

interface IProps {
  block: QuorumBlock;
}

interface IState {}

class ExplorerCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }  

  render() {
    return (
      <>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection={{ base: "column", md: "column" }}
          px={{ base: "5", md: "8" }}
          pt={{ base: "5", md: "2" }}
          pb={{ base: "5", md: "5" }}
          borderRadius="lg"
          borderWidth={2}
          overflow="hidden"
        >
          <VStack>
            <Text fontSize="md" as="b">
              {this.props.block.number}
              &nbsp;&nbsp;&nbsp;
              <ExplorerBlockDetails block={this.props.block}/>
            </Text>
            <Divider />
            <Text fontSize="sm" textAlign="left">
              {this.props.block.transactions.length} Transactions, {getSecsAgo(this.props.block.timestamp)} seconds ago 
            </Text>
            <Text fontSize="xs" align="center" >
              Validator: {this.props.block.miner}
            </Text>
          </VStack>
        </Flex>
      </>
    );
  }
}

export default ExplorerCard;
