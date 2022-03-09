import React from "react";
import { HStack, Container, Flex, Select, Text } from "@chakra-ui/react";
import NodeStack from "./NodeCard";
import { StackIProps } from "../types/nodes";
import { QuorumConfig } from '../types/config';

interface NodeStackIProp extends StackIProps {
  childHandler: any,
  config: QuorumConfig
}

export default function NodeData({
  childHandler,
  client,
  nodeId,
  nodeName,
  enode,
  rpcUrl,
  ip,
  showPending,
  config
}: NodeStackIProp) {
  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.md" }}>
        <Flex justify="flex-end" mb={5}>
          <HStack>
            <Text minW="max" fontSize="lg" color="muted">
              Select node:
            </Text>
            <Select variant="filled" onChange={childHandler}>
              {config.nodes.map((node, index) => (
                <option key={index} value={node.name}>
                  {node.name}
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
          showPending={showPending}
        />
      </Container>
    </>
  );
}