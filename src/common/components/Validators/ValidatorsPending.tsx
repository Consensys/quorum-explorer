import {
  Heading,
  Center,
  Code,
  Skeleton,
  Box,
  Flex,
  Button,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { buttonState } from "../../types/Validator";
import { QuorumConfig, QuorumNode } from "../../types/QuorumConfig";
import { discardProposal } from "../../lib/validators";
import { getDetailsByNodeName } from "../../lib/quorumConfig";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface IProps {
  config: QuorumConfig;
  pendingList: string[];
  selectedNode: string;
}

export default function ValidatorsPending(props: IProps) {
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
    const discardStatus = await discardProposal(
      rpcUrl,
      client,
      props.config.algorithm,
      e[0]
    );
    if (discardStatus === 200) {
      console.log("Address discarded: " + e);
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
        <Center>
          <Heading size="lg" mb={5}>
            Pending Votes
          </Heading>
        </Center>
        {props.pendingList.length > 0 ? (
          props.pendingList.map((pending, i) => {
            return (
              <>
                <MotionFlex
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  key={i}
                  m={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Tooltip
                    label={Object.values(pending)[1] ? "Vote in!" : "Vote out!"}
                    aria-label="Vote validator in or out"
                  >
                    <Code
                      colorScheme={Object.values(pending)[1] ? "green" : "red"}
                    >
                      {Object.values(pending)}
                    </Code>
                  </Tooltip>
                  <Spacer />
                  <Button
                    bgColor="yellow.400"
                    isLoading={buttonLoading[i] ? true : false}
                    loadingText="Discarding..."
                    onClick={() => handleClick(pending, i)}
                  >
                    Discard Vote
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
          </>
        )}
      </MotionBox>
    </>
  );
}
