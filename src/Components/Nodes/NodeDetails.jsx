import React from "react";
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

export default function NodeDetails({
  client,
  nodeId,
  nodeName,
  enode,
  rpcUrl,
  ip,
  statusText,
}) {
  return (
    <>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        maxW={{ base: "container.sm", md: "container.xl" }}
      >
        <Flex flexDirection="column" borderRadius="lg" borderWidth={2}>
          <Box m={5}>
            <Flex flexDirection="row" flexWrap="wrap">
              <Text as="b" width={"200px"}>
                Client:
              </Text>
              {statusText === "OK" ? (
                <MotionText
                  key={client}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {client}
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
              {statusText === "OK" ? (
                <MotionText
                  key={nodeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  // textAlign="right"
                  w={{ base: "100%", md: "73%" }}
                >
                  {nodeId}
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
              {statusText === "OK" ? (
                <MotionText
                  key={nodeName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {nodeName}
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
              {statusText === "OK" ? (
                <MotionText
                  key={enode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  // textAlign="right"
                  w={{ base: "100%", md: "73%" }}
                >
                  {enode}
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
              {statusText === "OK" ? (
                <MotionText
                  key={rpcUrl}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {rpcUrl}
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
              {statusText === "OK" ? (
                <MotionText
                  key={ip}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  end={{ opacity: 0 }}
                  w={{ base: "100%", md: "73%" }}
                >
                  {ip}
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
