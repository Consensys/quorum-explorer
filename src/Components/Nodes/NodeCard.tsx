import React, { Component, ReactElement } from "react";
import { Box, Heading, Text, HStack, VStack, Flex } from "@chakra-ui/react";

interface IProps {
  title: string,
  text: string|number,
  icon: ReactElement;
}

interface IState {
}

class NodeCard extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }

  render(){
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
        // boxShadow={useColorModeValue("xs", "2xl")}
      >
        <VStack>
          <HStack mb={3}>
            <Box>{this.props.icon}</Box>
            <Heading>{this.props.title}</Heading>
            <Text fontSize="lg" color="muted">
              {this.props.text}
            </Text>
          </HStack>
        </VStack>
      </Flex>

      </>
    );
  }
}

export default NodeCard;