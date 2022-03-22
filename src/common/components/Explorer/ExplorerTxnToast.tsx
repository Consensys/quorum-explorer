import {
  Box,
  Text,
  HStack,
  Spacer,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { QuorumTxn } from "../../types/Explorer";

interface IProps {
  txn: QuorumTxn;
  closeToast: any;
}

export default function ExplorerTxnToast({ txn, closeToast }: IProps) {
  return (
    <Box color="white" p={3} bg="#2c56dd">
      <HStack>
        <Text fontSize="sm" as="b" textAlign="left">
          Transaction:&nbsp;&nbsp; {txn.hash.substring(0, 48) + "..."}
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
            <Td borderBottomColor={"#2c56dd"}>TxnHash&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.hash} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>BlockHash&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.blockHash} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>BlockNumber&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.blockNumber} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>From&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.from} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Gas&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.gas} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>GasPrice&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.gasPrice} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Input&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.input.substring(0, 64)} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>To&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.to} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Nonce&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.nonce} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>TxnIndex&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.transactionIndex} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>Value&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.value} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>R&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.r} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>S&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.s} </Td>
          </Tr>
          <Tr fontSize="xs">
            <Td borderBottomColor={"#2c56dd"}>V&nbsp;</Td>
            <Td borderBottomColor={"#2c56dd"}>{txn.v} </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
