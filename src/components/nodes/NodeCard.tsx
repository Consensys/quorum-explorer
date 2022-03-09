import React from "react";
import { Box, Heading, Divider, Skeleton, Text } from "@chakra-ui/react";
import { StackIProps } from "../types/nodes";

interface NodeIProps {
  title: string,
  desc: string,
  showPending: boolean
  divider: boolean
}

function NodeCard({ title, desc, showPending, divider }: NodeIProps) {
  return (
    <>
      <Heading fontSize="xl">{title}</Heading>
      {showPending ? (
        <>
          <Skeleton minH="20px" mt={5} mb={3} />
          <Skeleton minH="20px" mt={1} mb={3} />
        </>
      ) : (
        <Text colorScheme="messenger" mt={4}>
          {desc}
        </Text>
      )}
      {divider && <Divider mt={5} mb={5} />}
    </>
  );
}

export default function NodeStack({
  client,
  nodeId,
  nodeName,
  enode,
  rpcUrl,
  ip,
  showPending,
}: StackIProps) {
  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
        <NodeCard title="Client" desc={client} showPending={showPending} divider={true} />
        <NodeCard title="Node ID" desc={nodeId} showPending={showPending} divider={true} />
        <NodeCard title="Node Name" desc={nodeName} showPending={showPending} divider={true} />
        <NodeCard title="ENODE" desc={enode} showPending={showPending} divider={true} />
        <NodeCard title="RPC-URL" desc={rpcUrl} showPending={showPending} divider={true} />
        <NodeCard title="IP Address" desc={ip} showPending={showPending} divider={false} />
      </Box>
    </>
  );
}