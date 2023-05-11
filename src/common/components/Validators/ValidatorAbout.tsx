import { Heading, Text, VStack, Box, Center } from "@chakra-ui/react";
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
        boxShadow="lg"
        p={5}
        mx={2}
        my={3}
      >
        <Center>
          <VStack>
            <Heading size="lg" mb={5}>
              Info
            </Heading>
            <Text as="b">
              Please take note that this view simulates a production environment
              or consortium where each node should individually run these API
              calls to vote.
            </Text>
            <Text>
              When using the buttons to remove, discard pending, or proposing a
              validator, the app will send an API request to the selected node
              from the drop down only. So, in order to add/remove a validator
              you need to select a majority of the existing validator pool
              individually and perform the vote API call by clicking the button.
              Also note that vote calls made from non validator nodes will have
              no effect on overall consensus.
            </Text>
            <Text>
              When a validator is proposed or removed, the entry under &quotPending
              Votes&quot will not automatically be removed. Each node can call a
              discard on the voting process during or after the validator has
              been added.
            </Text>
          </VStack>
        </Center>
      </MotionBox>
    </>
  );
}
