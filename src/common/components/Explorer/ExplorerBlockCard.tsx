import {
  Divider,
  VStack,
  Flex,
  Text,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import ExplorerBlockDetails from "./ExplorerBlockDetails";
import { QuorumBlock } from "../../types/Explorer";
import { getSecsAgo, abbreviateValidator } from "../../lib/explorer";

interface IProps {
  block: QuorumBlock;
  setIsPaused: any;
}

export default function ExplorerBlockCard({ block, setIsPaused }: IProps) {
  // console.log(block);
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "column" }}
        px={{ base: "5", md: "8" }}
        pt={{ base: "5", md: "4" }}
        pb={{ base: "5", md: "4" }}
        borderRadius="lg"
        borderWidth={2}
        boxShadow="lg"
        overflow="hidden"
      >
        <VStack>
          {block.statusText !== "error" && block.number !== "-1" ? (
            <>
              <HStack>
                <Text fontSize="md" as="b">
                  {parseInt(block.number, 16)}
                </Text>
                <ExplorerBlockDetails block={block} setIsPaused={setIsPaused} />
              </HStack>
              <Divider />
              <Text fontSize="sm" textAlign="left">
                {block.transactions.length} Transactions,{" "}
                {getSecsAgo(block.timestamp)} seconds ago
              </Text>
              <Text fontSize="sm" align="center">
                Validator: {abbreviateValidator(block.miner)}
              </Text>
            </>
          ) : (
            <>
              <Skeleton h="20px" w="130px" />
              <Divider />
              <Skeleton h="20px" w="130px" />
              <Skeleton h="20px" w="130px" />
            </>
          )}
        </VStack>
      </Flex>
    </>
  );
}
