import React, { Component } from "react";
import {
  Text,
  Skeleton,
  Container,
  Flex,
  Box,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionContainer = motion(Container);
const MotionText = motion(Text);

interface IProps {
  client: string;
  nodeId: string;
  nodeName: string;
  enode: string;
  rpcUrl: string;
  ip: string;
  statusText?: string;
}

interface IState {}

class NodeDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
        <MotionContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          maxW={{ base: "container.sm", md: "container.xl" }}
        >
          <Flex flexDirection="column" borderRadius="lg" borderWidth={2}>
            <Box m={5}>
              <Flex flexDirection="row" flexWrap="wrap">
                <Text as="b" width={"200px"}>
                  Client:
                </Text>
                {this.props.statusText === "OK" ? (
                  <MotionText
                    MotionText
                    key={this.props.client}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    end={{ opacity: 0 }}
                  >
                    {this.props.client}
                  </MotionText>
                ) : (
                  <>
                    <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex flexDirection="row" flexWrap="wrap">
                <Text as="b" width={"200px"}>
                  Node ID:
                </Text>
                {this.props.statusText === "OK" ? (
                  <MotionText
                    key={this.props.nodeId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    end={{ opacity: 0 }}
                    textAlign="right"
                    maxW="60%"
                  >
                    {this.props.nodeId}
                  </MotionText>
                ) : (
                  <>
                    <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex flexDirection="row" flexWrap="wrap">
                <Text as="b" width={"200px"}>
                  Node Name:
                </Text>
                {this.props.statusText === "OK" ? (
                  <MotionText
                    key={this.props.nodeName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    end={{ opacity: 0 }}
                  >
                    {this.props.nodeName}
                  </MotionText>
                ) : (
                  <>
                    <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex flexDirection="row" flexWrap="wrap">
                <Text as="b" width={"200px"}>
                  Enode:
                </Text>
                {this.props.statusText === "OK" ? (
                  <MotionText
                    key={this.props.enode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    end={{ opacity: 0 }}
                    textAlign="right"
                    maxW="80%"
                  >
                    {this.props.enode}
                  </MotionText>
                ) : (
                  <>
                    <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex flexDirection="row" flexWrap="wrap">
                <Text as="b" width={"200px"}>
                  RPC Url:
                </Text>
                {this.props.statusText === "OK" ? (
                  <MotionText
                    key={this.props.rpcUrl}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    end={{ opacity: 0 }}
                  >
                    {this.props.rpcUrl}
                  </MotionText>
                ) : (
                  <>
                    <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex flexDirection="row" flexWrap="wrap">
                <Text as="b" width={"200px"}>
                  IP Address:
                </Text>
                {this.props.statusText === "OK" ? (
                  <MotionText
                    key={this.props.ip}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    end={{ opacity: 0 }}
                  >
                    {this.props.ip}
                  </MotionText>
                ) : (
                  <>
                    <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                  </>
                )}
              </Flex>
            </Box>
          </Flex>
        </MotionContainer>
      </>
    );
  }
}

export default NodeDetails;
