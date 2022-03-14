
import { Box, Text, HStack, Spacer, Divider} from "@chakra-ui/react";
import { QuorumTxn } from "../Types/Explorer";

interface IProps {
  txn: QuorumTxn;
  closeToast: any
}

export default function ExplorerTxnToast({txn, closeToast}: IProps) {

  return(
    <Box color='white' p={3} bg='#2c56dd'>
      <HStack>
        <Text fontSize="sm" as="b" textAlign="left">Transaction:&nbsp;&nbsp; {txn.hash}</Text>
        <Spacer />
        <Box as='button' onClick={closeToast} borderRadius='md' bg='tomato' color='white' px={3} h={8}>x</Box> 
      </HStack>
      <Divider my={4}/>
      <Text fontSize="sm" textAlign="left">Block Hash:&nbsp; {txn.blockHash}</Text> 
      <Text fontSize="sm" textAlign="left">Block Number:&nbsp; {txn.blockNumber}</Text> 
      <Text fontSize="sm" textAlign="left">From:&nbsp; {txn.from}</Text>
      <Text fontSize="sm" textAlign="left">Gas:&nbsp; {txn.gas}</Text>
      <Text fontSize="sm" textAlign="left">Gas Price:&nbsp; {txn.gasPrice}</Text>
      <Text fontSize="sm" textAlign="left">Input:&nbsp; {txn.input}</Text>
      <Text fontSize="sm" textAlign="left">Nonce:&nbsp; {txn.nonce}</Text>
      <Text fontSize="sm" textAlign="left">To:&nbsp; {txn.to}</Text>
      <Text fontSize="sm" textAlign="left">Txn Index:&nbsp; {txn.transactionIndex}</Text>
      <Text fontSize="sm" textAlign="left">Value:&nbsp; {txn.value}</Text>
      <Text fontSize="sm" textAlign="left">R:&nbsp; {txn.r}</Text>
      <Text fontSize="sm" textAlign="left">S:&nbsp; {txn.s}</Text>
      <Text fontSize="sm" textAlign="left">V:&nbsp; {txn.v}</Text>
    </Box>
  );
  
}

