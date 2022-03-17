import React, { Component } from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
  Spacer,
  Box,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { proposeValidator } from "../API/Validators";
import { getDetailsByNodeName } from "../API/QuorumConfig";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
interface IProps {
  config: QuorumConfig;
  minersList: string[];
  selectedNode: string;
}

interface IState {}

export default function ValidatorsActive(props: IProps) {
  const handleClick = async (e: any) => {
    console.log(e);
    const needle: QuorumNode = getDetailsByNodeName(
      props.config,
      props.selectedNode
    );
    const rpcUrl: string = needle.rpcUrl;
    const client: string = needle.client;
    const removeValidator = await proposeValidator(
      rpcUrl,
      client,
      props.config.algorithm,
      e,
      false
    );
    if (removeValidator === 200) {
      console.log("Proposal to remove initiated: " + e);
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
        <Center mb={5}>
          <Heading size="lg">Active Validators</Heading>
        </Center>
        {props.minersList.length > 0 ? (
          props.minersList.map((miner, i) => {
            return (
              <>
                <Flex key={i} m={3} justifyContent="center" alignItems="center">
                  <Text>{miner}</Text>
                  <Spacer />
                  <Button onClick={() => handleClick(miner)}>
                    Remove Validator
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
