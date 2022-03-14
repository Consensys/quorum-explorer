import React, { Component } from "react";
import { Divider, VStack, HStack, Flex, Text, Skeleton, Box} from "@chakra-ui/react";
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
          alignItems="center"
          justifyContent="center"
          flexDirection={{ base: "column", md: "column" }}
          px={{ base: "5", md: "8" }}
          pt={{ base: "5", md: "4" }}
          pb={{ base: "5", md: "4" }}
          borderRadius="lg"
          borderWidth={2}
          overflow="hidden"
        >

          <HStack spacing={10}>
              {/* contract deployment */}
              {this.props.txn.to === null ? (
              <Box maxW={100} color="lightGreen" > 
                <Text fontSize="sm" textAlign="left"> Contract Deployment </Text>
              </Box>
              ) : (
                <Box maxW={100} bgColor="green" > 

                <Text fontSize="sm" textAlign="left"  > Regular Transaction </Text>
                </Box>
              )}
            <VStack>
              {this.props.txn.hash !== null ? (
                <>
                  {" "}
                  <Text fontSize="md" as="b">
                    {this.props.txn.hash}
                    &nbsp;&nbsp;&nbsp;
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
                  <Skeleton h="20px" w="130px" />
                  <Divider />
                  <Skeleton h="20px" w="130px" />
                  <Skeleton h="20px" w="130px" />
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
