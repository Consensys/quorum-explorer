import React, { Component } from "react";
import { Divider, VStack, HStack, Flex, Text, Skeleton, Box} from "@chakra-ui/react";
import ExplorerTxnDetails from "./ExplorerTxnDetails";
import { QuorumTxn } from "../Types/Explorer";
import { getSecsAgo, abbreviateValidator } from '../API/Explorer';

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
        <Flex
          alignItems="left"
          justifyContent="center"
          flexDirection={{ base: "column", md: "column" }}
          p={{ base: "2", md: "2" }}
          borderRadius="lg"
          borderWidth={2}
          overflow="hidden"
        >

          <HStack spacing={10}>
              {/* contract deployment */}
              {this.props.txn.to === null ? (
              <Box h={"100%"} maxW={125} borderRadius="md" borderWidth={1} bg="darkOrange" >
                <Text fontSize="sm" textAlign="center"> Contract Deployment </Text>
              </Box>
              ) : (
              <Box h={"100%"} maxW={125} borderRadius="md" borderWidth={1} bg="limeGreen" >
                <Text fontSize="sm" textAlign="center" > Regular Transaction </Text>
              </Box>
              )}
            <VStack >
              {this.props.txn.hash !== null ? (
                <>
                  {" "}
                  <Text fontSize="md" as="b" >
                    {this.props.txn.hash}
                    &nbsp;&nbsp;&nbsp;
                   <ExplorerTxnDetails txn={this.props.txn} />
                  </Text>
                  <Divider />
                  <Text fontSize="sm" textAlign="left">
                    Block: {this.props.txn.blockNumber}, hash: {this.props.txn.blockHash}  
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
            </VStack>
          </HStack>
        </Flex>
      </>
    );
  }
}

export default ExplorerTxnCard;
