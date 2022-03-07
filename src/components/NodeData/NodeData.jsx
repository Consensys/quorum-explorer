import React from "react";
import { HStack, Container, Flex, Select, Text, Stack } from "@chakra-ui/react";
import NodeStack from "./NodeCard";
const nodesConfig = require("../../config/nodes.json");
const nodeKeys = Object.keys(nodesConfig);

export default function NodeData({
  childHandler,
  client,
  nodeId,
  nodeName,
  enode,
  rpcUrl,
  ip,
}) {
  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.md" }}>
        <Flex justify="flex-end" mb={5}>
          <HStack>
            <Text minW="max" fontSize="lg" color="muted">
              Select node:
            </Text>
            <Select variant="filled" onChange={childHandler}>
              {nodeKeys.map((node, index) => (
                <option key={index} value={node}>
                  {node}
                </option>
              ))}
            </Select>
          </HStack>
        </Flex>
        <NodeStack
          client={client}
          nodeId={nodeId}
          nodeName={nodeName}
          enode={enode}
          rpcUrl={rpcUrl}
          ip={ip}
        />
      </Container>
    </>
  );
}
