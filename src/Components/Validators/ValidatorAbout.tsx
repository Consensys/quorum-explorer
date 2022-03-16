import React, { Component } from "react";
import { Heading, Text, VStack, Box, Center, Code } from "@chakra-ui/react";
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
              only. When using the buttons to remove, discard pending, or
              proposing a validator, the app will send an API request to all
              nodes automatically. It should be noted in a production
              environment, or where you do not have full control over all nodes,
              this will be dependent on each party running these API requests
              individually.
            </Text>
            <Text>
              This page simulates API calls to all nodes specified in{" "}
              <Code>src/Config/config.json</Code> to remove or propose
              validators in a network.
            </Text>
            <Text>
              You may find more information about making these API calls
              yourself by following the documentation.
            </Text>
          </VStack>
        </Center>
      </MotionBox>
    </>
  );
}
