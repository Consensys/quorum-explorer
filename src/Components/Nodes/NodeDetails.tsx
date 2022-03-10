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
          maxW={{ base: "container.sm", md: "container.lg" }}
        >
          <Flex flexDirection="column" borderRadius="lg" borderWidth={2}>
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Client:</Text>
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
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Node ID:</Text>
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
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Node Name:</Text>
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
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Enode:</Text>
                {this.props.statusText === "OK" ? (
                  <MotionText
                    key={this.props.enode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    end={{ opacity: 0 }}
                    textAlign="right"
                    maxW="60%"
                  >
                    {this.props.enode}
                  </MotionText>
                ) : (
                  <>
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>RPC Url:</Text>
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
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>IP Address:</Text>
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
                    <Skeleton w="50%" h="20px" />
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
