import {
  Text,
  Skeleton,
  Container,
  Flex,
  Box,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionContainer = motion(Container);
const MotionText = motion(Text);

interface IProps {
  client: string;
  nodeId: string;
  nodeName: string;
  enode: string;
  rpcUrl: string;
  ip: string;
  statusText?: string;
}

export default function NodeDetails(props: IProps) {
  return (
    <>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        maxW={{ base: "container.sm", md: "container.xl" }}
      >
        <Flex
          flexDirection="column"
          borderRadius="lg"
          borderWidth={2}
          boxShadow="lg"
        >
          <Box m={5}>
            <Flex flexDirection="row" flexWrap="wrap">
              <Text as="b" width={"200px"}>
                Client:
              </Text>
              {props.statusText === "OK" ? (
                <MotionText
                  key={props.client}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {props.client}
                </MotionText>
              ) : (
                <>
                  <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                </>
              )}
            </Flex>
          </Box>
          <Divider />
          <Box m={5}>
            <Flex flexDirection="row" flexWrap="wrap">
              <Text as="b" width={"200px"}>
                Node ID:
              </Text>
              {props.statusText === "OK" ? (
                <MotionText
                  key={props.nodeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  // textAlign="right"
                  w={{ base: "100%", md: "73%" }}
                >
                  {props.nodeId}
                </MotionText>
              ) : (
                <>
                  <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                </>
              )}
            </Flex>
          </Box>
          <Divider />
          <Box m={5}>
            <Flex flexDirection="row" flexWrap="wrap">
              <Text as="b" width={"200px"}>
                Node Name:
              </Text>
              {props.statusText === "OK" ? (
                <MotionText
                  key={props.nodeName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {props.nodeName}
                </MotionText>
              ) : (
                <>
                  <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                </>
              )}
            </Flex>
          </Box>
          <Divider />
          <Box m={5}>
            <Flex flexDirection="row" flexWrap="wrap">
              <Text as="b" width={"200px"}>
                Enode:
              </Text>
              {props.statusText === "OK" ? (
                <MotionText
                  key={props.enode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  // textAlign="right"
                  w={{ base: "100%", md: "73%" }}
                >
                  {props.enode}
                </MotionText>
              ) : (
                <>
                  <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                </>
              )}
            </Flex>
          </Box>
          <Divider />
          <Box m={5}>
            <Flex flexDirection="row" flexWrap="wrap">
              <Text as="b" width={"200px"}>
                RPC Url:
              </Text>
              {props.statusText === "OK" ? (
                <MotionText
                  key={props.rpcUrl}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {props.rpcUrl}
                </MotionText>
              ) : (
                <>
                  <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                </>
              )}
            </Flex>
          </Box>
          <Divider />
          <Box m={5}>
            <Flex flexDirection="row" flexWrap="wrap">
              <Text as="b" width={"200px"}>
                IP Address:
              </Text>
              {props.statusText === "OK" ? (
                <MotionText
                  key={props.ip}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {props.ip}
                </MotionText>
              ) : (
                <>
                  <Skeleton w={{ base: "100%", md: "73%" }} h="20px" />
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </MotionContainer>
    </>
  );
}
