import React, { useState } from "react";
import {
  Heading,
  Center,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { proposeValidator } from "../API/Validators";
import { getDetailsByNodeName } from "../API/QuorumConfig";

import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ValidatorsPropose(props) {
  const [propose, setPropose] = useState({
    address_input: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e);
    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    const rpcUrl = needle.rpcUrl;
    const client = needle.client;
    const removeValidator = await proposeValidator(
      rpcUrl,
      client,
      props.config.algorithm,
      propose.address_input,
      true
    );
    if (removeValidator === 200) {
      console.log("Successful proposed: " + propose.address_input);
    }
  };

  const handleInput = (e) => {
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
            Propose Validator
          </Heading>
        </Center>
        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input mb={3} id="address" type="text" onChange={handleInput} />
          <Button onClick={handleClick} type="submit">
            Propose Validator
          </Button>
        </FormControl>
      </MotionBox>
    </>
  );
}