import React, { Component } from "react";
import {
  Divider,
  Container,
  Flex,
  Text,
  Skeleton,
  Box,
  HStack,
} from "@chakra-ui/react";
import ExplorerTxnDetails from "./ExplorerTxnDetails";
import { QuorumTxn } from "../Types/Explorer";
import { getSecsAgo, abbreviateValidator } from "../API/Explorer";

interface IProps {
  txn: QuorumTxn;
}

interface IState {}

class ExplorerTxnCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Container maxW={{ base: "container.sm", md: "container.xl" }}>
          <Flex
            justifyContent="space-between"
            borderRadius="md"
            borderWidth={1}
          >
            {/* contract deployment */}
            <Flex
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              borderWidth={1}
              bg={this.props.txn.to === null ? "orange.300" : "green.300"}
              minW="15%"
            >
              {this.props.txn.to === null ? (
                <Text fontSize="sm" textAlign="center">
                  {" "}
                  Contract Deployment{" "}
                </Text>
              ) : (
                <Text fontSize="sm" textAlign="center">
                  {" "}
                  Regular Transaction{" "}
                </Text>
              )}
            </Flex>
            <Flex flexDirection="column" flexGrow={1} p={2}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {this.props.txn.hash !== null ? (
                  <>
                    {" "}
                    <Box>
                      <Text fontSize="md" as="b" mr={2}>
                        {this.props.txn.hash}
                      </Text>
                      <ExplorerTxnDetails txn={this.props.txn} />
                      <Divider m={1} />
                    </Box>
                    <Text fontSize="sm" textAlign="left">
                      Block: {this.props.txn.blockNumber}, hash:{" "}
                      {this.props.txn.blockHash}
                    </Text>
                    <Text fontSize="sm" align="left">
                      Gas: {this.props.txn.gas}
                    </Text>{" "}
                    <Text fontSize="sm" align="left">
                      From: {this.props.txn.from}
                    </Text>{" "}
                  </>
                ) : (
                  <>
                    <Skeleton h="20px" w="180px" />
                    <Divider />
                    <Skeleton h="20px" w="180px" />
                    <Skeleton h="20px" w="180px" />
                    <Skeleton h="20px" w="180px" />
                  </>
                )}
              </Box>
            </Flex>
          </Flex>
        </Container>
      </>
    );
  }
}

export default ExplorerTxnCard;
