import React, { Component, ReactElement } from "react";
import { QuorumBlock } from '../Types/Explorer'
import { Box, Heading, HStack, VStack, Flex, Text, } from "@chakra-ui/react";

interface IProps {
  block: QuorumBlock
}

interface IState {}

class ExplorerBlockDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection={{ base: "column", md: "row" }}
          px={{ base: "5", md: "6" }}
          py={{ base: "5", md: "6" }}
          borderRadius="lg"
          borderWidth={2}
        >
          <VStack>
            <Text fontSize='md' as='b'>
              {this.props.block.number}
            </Text>
            <Text fontSize='sm' textAlign="left">
              {this.props.block.transactions.length} Transactions
            </Text>
            <Text fontSize='sm' textAlign="left">
              {this.props.block.hash} hash
            </Text>
            <Text fontSize='xs' align="left">
              Validator: {this.props.block.miner}
            </Text>
          </VStack>

        </Flex>
      </>
    );
  }
}

export default ExplorerBlockDetails;
