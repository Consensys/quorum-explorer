import React, { Component, ReactElement } from "react";
import { Box, Heading, Skeleton, HStack, VStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionHeading = motion(Heading);
const MotionBox = motion(Box);

interface IProps {
  title: string;
  text: string | number;
  icon: ReactElement;
  statusText: string;
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
          px={{ base: "5", md: "5" }}
          py={{ base: "5", md: "5" }}
          borderRadius="lg"
          borderWidth={2}
        >
          <HStack spacing={10}>
            <MotionBox
              key={this.props.statusText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              end={{ opacity: 0 }}
            >
              {this.props.icon}
            </MotionBox>
            <VStack mb={3}>
              <MotionHeading
                key={this.props.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                end={{ opacity: 0 }}
                fontSize={{ base: "md", md: "2xl" }}
              >
                {this.props.title}
              </MotionHeading>
              {this.props.statusText === "OK" ? (
                <MotionHeading
                  key={this.props.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  fontSize="lg"
                  color="muted"
                >
                  {this.props.text}
                </MotionHeading>
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
