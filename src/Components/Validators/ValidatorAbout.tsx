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
              proposing a validator, the app will send an API request to the
              selected node from the drop down only. This simulates a production
              environment or consortium where each node should individually run
              these calls to vote.
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
