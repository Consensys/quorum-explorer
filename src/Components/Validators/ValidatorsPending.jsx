import React from "react";
import {
  Heading,
  Center,
  Text,
  Skeleton,
  Box,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { discardProposal } from "../API/Validators";
import { getDetailsByNodeName } from "../API/QuorumConfig";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ValidatorsPending(props) {
  const handleClick = async (e) => {
    console.log(e);
    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    const rpcUrl = needle.rpcUrl;
    const client = needle.client;
    const discardStatus = await discardProposal(
      rpcUrl,
      client,
      props.config.algorithm,
      e
    );
    if (discardStatus === 200) {
      console.log("Address discarded: " + e);
    }
  };
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
          <Heading size="lg" mb={5}>
            Pending Votes
          </Heading>
        </Center>
        {props.pendingList.length > 0 ? (
          props.pendingList.map((pending, i) => {
            return (
              <>
                <Flex key={i} m={3} justifyContent="center" alignItems="center">
                  <Text>{pending}</Text>
                  <Spacer />
                  <Button onClick={() => handleClick(pending)}>
                    Discard Vote
                  </Button>
                </Flex>
              </>
            );
          })
        ) : (
          <>
            <Skeleton h="20px" m={2} />
            <Skeleton h="20px" m={2} />
            <Skeleton h="20px" m={2} />
            <Skeleton h="20px" m={2} />
          </>
        )}
      </MotionBox>
    </>
  );
}
