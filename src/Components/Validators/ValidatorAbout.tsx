import React, { Component } from "react";
import {
  Heading,
  Text,
  VStack,
  Box,
  Center,
  Code,
  Link,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ValidatorsAbout() {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        borderRadius="lg"
        borderWidth={2}
        p={5}
        mx={2}
        my={3}
      >
        <Center>
          <VStack>
            <Heading size="lg" mb={5}>
              Info
            </Heading>
            <Text>
              Please take note that this page is for demonstration purposes
              only. If you are operating a network in production, especially in
              a consortium where you may not have direct access to other nodes,
              this page may not be useful.
            </Text>
            <Text>
              This page simulates API calls to all nodes specified in{" "}
              <Code>Config/config.json</Code> to remove or propose validators in
              a network.
            </Text>
            <Text>
              You may find more information about making these API calls
              yourself by following the documentation. Find these links as
              tooltips next to each card's heading.
            </Text>
          </VStack>
        </Center>
      </MotionBox>
    </>
  );
}
