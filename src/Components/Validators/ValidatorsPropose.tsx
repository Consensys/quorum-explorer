import { useState } from "react";
import {
  Heading,
  Center,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { proposeValidator } from "../../API/Validators";
import { getDetailsByNodeName } from "../../API/QuorumConfig";
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
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClick = async (e: any) => {
    e.preventDefault();
    console.log(e);
    setButtonLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
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
      propose.address_input,
      true
    );
    if (removeValidator === 200) {
      console.log("Successful proposed: " + propose.address_input);
    }
    setButtonLoading(false);
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
            Propose Validator
          </Heading>
        </Center>
        <FormControl as="form" onSubmit={handleClick}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input mb={3} id="address" type="text" onChange={handleInput} />
          <Button
            isLoading={buttonLoading}
            loadingText="Proposing..."
            // onClick={handleClick}
            type="submit"
          >
            Propose Validator
          </Button>
        </FormControl>
      </MotionBox>
    </>
  );
}
