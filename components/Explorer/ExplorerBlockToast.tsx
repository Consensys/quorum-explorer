import { Box, Text, HStack, Spacer, Divider } from "@chakra-ui/react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { QuorumBlock } from "../../Types/Explorer";

interface IProps {
  block: QuorumBlock;
  closeToast: any;
}

export default function ExplorerBlockToast({ block, closeToast }: IProps) {
  return (
    <Box color="white" p={3} bg="#2c56dd">
      <HStack>
        <Text fontSize="sm" as="b" textAlign="left">
          Block:&nbsp;&nbsp; {block.number}
        </Text>
        <Spacer />
        <Box
          as="button"
          onClick={closeToast}
          borderRadius="md"
          bg="tomato"
          color="white"
          px={3}
          h={8}
        >
          x
        </Box>
      </HStack>
      <Divider my={4} />
      <Table size="xs">
        <Tbody>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Hash&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.hash} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Transactions&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.transactions.length} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Uncles&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.uncles.length} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Size&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.size} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Gas Used&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.gasUsed} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Timestamp&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.timestamp} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>State Root&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.stateRoot} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Receipt Root&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.receiptsRoot} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Txn Root&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{block.transactionsRoot} </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
