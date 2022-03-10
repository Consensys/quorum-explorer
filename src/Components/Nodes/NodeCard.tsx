import React, { Component, ReactElement } from "react";
import { Box, Heading, Skeleton, HStack, VStack, Flex } from "@chakra-ui/react";

interface IProps {
  title: string;
  text: string | number;
  icon: ReactElement;
  showPending: boolean;
}

interface IState {}

class NodeCard extends Component<IProps, IState> {
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
          <HStack spacing={10}>
            <Box>{this.props.icon}</Box>
            <VStack mb={3}>
              <Heading fontSize={{ base: "md", md: "2xl" }}>
                {this.props.title}
              </Heading>
              {!this.props.showPending ? (
                <Heading fontSize="lg" color="muted">
                  {this.props.text}
                </Heading>
              ) : (
                <Skeleton h="30px" w="40px" />
              )}
            </VStack>
          </HStack>
        </Flex>
      </>
    );
  }
}

export default NodeCard;
