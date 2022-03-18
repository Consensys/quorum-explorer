
import { Divider, Container, Flex, Text, Skeleton, Box } from "@chakra-ui/react";
import ExplorerTxnDetails from "./ExplorerTxnDetails";
import { QuorumTxn } from "../Types/Explorer";

interface IProps {
  txn: QuorumTxn;
}

export default function ExplorerTxnCard({ txn }: IProps) {
  
  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <Flex
          justifyContent="space-between"
          borderRadius="md"
          borderWidth={1}
        >
          {/* contract deployment */}
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            borderWidth={1}
            bg={txn.to === null ? "orange.300" : "green.400"}
            minW="15%"
          >
            {txn.to === null ? (
              <Text fontSize="sm" textAlign="center">
                {" "}
                Contract Deployment{" "}
              </Text>
            ) : (
              <Text fontSize="sm" textAlign="center">
                {" "}
                Regular Transaction{" "}
              </Text>
            )}
          </Flex>
          <Flex flexDirection="column" flexGrow={1} p={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {txn.hash !== null ? (
                <>
                  {" "}
                  <Box>
                    <Text fontSize="md" as="b" mr={2}>
                      {txn.hash}
                    </Text>
                    <ExplorerTxnDetails txn={txn} />
                    <Divider m={1} />
                  </Box>
                  <Text fontSize="sm" textAlign="left">
                    Block: {txn.blockNumber}, hash:{" "}
                    {txn.blockHash}
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
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

