import React from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

function NodeCard({ title, desc }) {
  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
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
}) {
  return (
    <>
      <Stack spacing={8}>
        <NodeCard title="Client" desc={client} />
        <NodeCard title="Node ID" desc={nodeId} />
        <NodeCard title="Node Name" desc={nodeName} />
        <NodeCard title="ENODE" desc={enode} />
        <NodeCard title="RPC-URL" desc={rpcUrl} />
        <NodeCard title="IP Address" desc={ip} />
      </Stack>
    </>
  );
}
