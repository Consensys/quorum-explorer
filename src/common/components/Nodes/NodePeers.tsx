import {
  Text,
  Container,
  Flex,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionContainer = motion(Container);
const MotionText = motion(Text);

interface IProps {
  peers: any;
}

export default function NodePeers({ peers }: IProps) {
  return (
    <>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        maxW={{ base: "container.sm", md: "container.xl" }}
        mt={10}
      >
        <Flex
          flexDirection="column"
          borderRadius="lg"
          borderWidth={2}
          boxShadow="lg"
        >
          <TableContainer>
            <Table variant="simple" style={{ tableLayout: "fixed" }}>
              <TableCaption placement="top">Peer Information</TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <Center>ID</Center>
                  </Th>
                  <Th>
                    <Center>E-Node</Center>
                  </Th>
                  <Th>
                    <Center>Local Address</Center>
                  </Th>
                  <Th>
                    <Center>Remote-Address</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {peers.map((peer: any) => {
                  return (
                    <>
                      <Tr>
                        <Td>
                          <Center>
                            <Tooltip label={peer.id} placement="auto">
                              <MotionText
                                key={peer.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                end={{ opacity: 0 }}
                                isTruncated
                              >
                                {peer.id}
                              </MotionText>
                            </Tooltip>
                          </Center>
                        </Td>
                        <Td>
                          <Center>
                            <Tooltip label={peer.enode} placement="auto">
                              <MotionText
                                key={peer.enode}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                end={{ opacity: 0 }}
                                isTruncated
                              >
                                {peer.enode}
                              </MotionText>
                            </Tooltip>
                          </Center>
                        </Td>
                        <Td>
                          <Center>
                            <Tooltip label={peer.localAddress} placement="auto">
                              <MotionText
                                key={peer.localAddress}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                end={{ opacity: 0 }}
                                isTruncated
                              >
                                {peer.localAddress}
                              </MotionText>
                            </Tooltip>
                          </Center>
                        </Td>
                        <Td>
                          <Center>
                            <Tooltip
                              label={peer.remoteAddress}
                              placement="auto"
                            >
                              <MotionText
                                key={peer.remoteAddress}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                end={{ opacity: 0 }}
                                isTruncated
                              >
                                {peer.remoteAddress}
                              </MotionText>
                            </Tooltip>
                          </Center>
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </MotionContainer>
    </>
  );
}
