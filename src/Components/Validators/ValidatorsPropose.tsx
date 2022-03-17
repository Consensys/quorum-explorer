import React, { useState } from "react";
import {
  Heading,
  Flex,
  Center,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Box,
  Button,
} from "@chakra-ui/react";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { proposeValidator } from "../API/Validators";
import { getDetailsByNodeName } from "../API/QuorumConfig";

import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
}

interface IState {
  address_input: string;
}

export default function ValidatorsPropose(props: IProps) {
  const [propose, setPropose] = useState<IState>({
    address_input: "",
  });

  const handleClick = async (e: any) => {
    e.preventDefault();
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
      propose.address_input
    );
    if (removeValidator === 200) {
      console.log("Successful proposed: " + propose.address_input);
    }
  };

  const handleInput = (e: any) => {
    setPropose({ address_input: e.target.value });
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
            Propose Validators
          </Heading>
        </Center>
        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input id="address" type="text" onChange={handleInput} />
          <FormHelperText>Wow!</FormHelperText>
          <Button onClick={handleClick} type="submit">
            Propose Validator
          </Button>
        </FormControl>
      </MotionBox>
    </>
  );
}
