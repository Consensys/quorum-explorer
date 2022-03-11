import React, { Component, ReactElement } from "react";
import { QuorumBlock } from '../Types/Explorer'
import ExplorerBlockDetails from './ExplorerBlockDetails'
import { Box, Heading, HStack, VStack, Flex, Text, Tag, Tooltip } from "@chakra-ui/react";

interface IProps {
  block: QuorumBlock
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
          flexDirection={{ base: "column", md: "row" }}
          px={{ base: "5", md: "6" }}
          py={{ base: "5", md: "6" }}
          borderRadius="lg"
          borderWidth={2}
        >
          <VStack>
            <Text fontSize='md' as='b'>
              <Tooltip fontSize='md' as='b' label="Hey, I'm here!" aria-label='A tooltip'>
                {this.props.block.number}
              </Tooltip>
            </Text>
            <Text fontSize='sm' textAlign="left">
              {this.props.block.transactions.length} Transactions
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

export default ExplorerCard;
