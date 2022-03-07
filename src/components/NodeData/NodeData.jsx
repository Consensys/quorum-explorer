import React from "react";
import { HStack, Container, Flex, Select, Text } from "@chakra-ui/react";
const nodesConfig = require("../../config/nodes.json");
const nodeKeys = Object.keys(nodesConfig);

export default function NodeData({
  selectedNode,
  client,
  nodeId,
  nodeName,
  enode,
  rpcUrl,
  ip,
}) {
  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <Flex justify="flex-end">
          <HStack>
            <Text minW="max" fontSize="lg" color="muted">
              Select node:
            </Text>
            <Select variant="filled">
              {nodeKeys.map((node, index) => (
                <option key={index} value={node}>
                  {node}
                </option>
              ))}
            </Select>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}
