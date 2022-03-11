import React, { Component, ReactElement } from "react";
import { QuorumBlock } from "../Types/Explorer";
import ExplorerBlockDetails from "./ExplorerBlockDetails";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Flex,
  Text,
  Container,
  Tooltip,
} from "@chakra-ui/react";

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
          py={{ base: "5", md: "6" }}
          borderRadius="lg"
          borderWidth={2}
          overflow="hidden"
        >
          <VStack>
            <Text fontSize="md" as="b">
              <Tooltip
                fontSize="md"
                as="b"
                label={this.props.block.number}
                aria-label="Block number"
              >
                {this.props.block.number}
              </Tooltip>
            </Text>
            <Text fontSize="sm" textAlign="left">
              {this.props.block.transactions.length} Transactions
            </Text>
            <Text fontSize="xs" align="center">
              Validator:{" "}
              <Tooltip
                fontSize="md"
                as="b"
                label={this.props.block.miner}
                aria-label="A tooltip"
              >
                {this.props.block.miner}
              </Tooltip>
            </Text>
          </VStack>
        </Flex>
      </>
    );
  }
}

export default ExplorerCard;
