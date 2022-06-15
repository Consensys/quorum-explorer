import {
  Divider,
  Container,
  Flex,
  Text,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import ExplorerTxnDetails from "./ExplorerTxnDetails";
import { QuorumTxn } from "../../types/Explorer";

interface IProps {
  txn: QuorumTxn;
}

export default function ExplorerTxnCard({ txn }: IProps) {
  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          borderRadius="md"
          borderWidth={1}
          boxShadow="md"
        >
          {/* contract deployment */}
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            borderWidth={1}
            boxShadow="md"
            bg={txn.to === null ? "orange.300" : "green.400"}
            minW="15%"
          >
            {txn.to === null ? (
              <Text fontSize="sm" textAlign="center">
                Contract Deployment
              </Text>
            ) : (
              <Text fontSize="sm" textAlign="center">
                Transaction
              </Text>
            )}
          </Flex>
          <Flex flexDirection="column" flexGrow={1} p={2} minW="85%">
            <Flex flexDirection="column" alignItems="center" maxW="100%">
              {txn.hash !== null ? (
                <>
                  <Box minW={0}>
                    <Text
                      maxW="100px"
                      overflowWrap="break-word"
                      fontSize={{ base: "sm", md: "md" }}
                      as="b"
                      mr={2}
                    >
                      {txn.hash}
                    </Text>
                    <ExplorerTxnDetails txn={txn} />
                  </Box>
                  <Divider m={1} />
                  <Text fontSize="sm" textAlign="left">
                    Block: {parseInt(txn.blockNumber.toString(), 16)}
                  </Text>
                  <Text fontSize="sm" textAlign="left">
                    Hash: {txn.blockHash}
                  </Text>
                  <Text fontSize="sm" align="left">
                    Gas: {txn.gas}
                  </Text>{" "}
                  <Text fontSize="sm" align="left">
                    From: {txn.from}
                  </Text>{" "}
                </>
              ) : (
                <>
                  <Skeleton h="20px" w="180px" />
                  <Divider />
                  <Skeleton h="20px" w="180px" />
                  <Skeleton h="20px" w="180px" />
                  <Skeleton h="20px" w="180px" />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
