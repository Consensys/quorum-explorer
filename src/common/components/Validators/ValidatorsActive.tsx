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
import { useState } from "react";
import { QuorumConfig, QuorumNode } from "../../types/QuorumConfig";
import { proposeValidator } from "../../api/validators";
import { getDetailsByNodeName } from "../../api/quorumConfig";
import { buttonState } from "../../types/Validator";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
interface IProps {
  config: QuorumConfig;
  minersList: string[];
  selectedNode: string;
}

export default function ValidatorsActive(props: IProps) {
  const [buttonLoading, setButtonLoading] = useState<buttonState>({});
  const handleClick = async (e: any, index: number) => {
    console.log(e);
    setButtonLoading({ [index]: true });
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
      e,
      false
    );
    if (removeValidator === 200) {
      console.log("Proposal to remove initiated: " + e);
    }
    setButtonLoading({ [index]: false });
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
        {props.minersList !== undefined && props.minersList.length > 0 ? (
          props.minersList.map((miner, i) => {
            return (
              <>
                <MotionFlex
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  m={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text>{miner}</Text>
                  <Spacer key={i} />
                  <Button
                    bgColor="red.400"
                    isLoading={buttonLoading[i] ? true : false}
                    loadingText="Removing..."
                    onClick={() => handleClick(miner, i)}
                  >
                    Remove
                  </Button>
                </MotionFlex>
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
