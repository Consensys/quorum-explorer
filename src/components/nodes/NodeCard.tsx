import React from "react";
import { Box, Heading, Stack, Skeleton, Text } from "@chakra-ui/react";
import { StackIProps } from "../types/nodes";

interface NodeIProps {
  title: string,
  desc: string,
  showPending: boolean
}

function NodeCard({ title, desc, showPending }:NodeIProps) {
  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px">
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
      </Box>
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
      <Stack spacing={8}>
        <NodeCard title="Client" desc={client} showPending={showPending} />
        <NodeCard title="Node ID" desc={nodeId} showPending={showPending} />
        <NodeCard title="Node Name" desc={nodeName} showPending={showPending} />
        <NodeCard title="ENODE" desc={enode} showPending={showPending} />
        <NodeCard title="RPC-URL" desc={rpcUrl} showPending={showPending} />
        <NodeCard title="IP Address" desc={ip} showPending={showPending} />
      </Stack>
    </>
  );
}