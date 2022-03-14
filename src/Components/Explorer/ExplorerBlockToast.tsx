import { Box, Text, HStack, Spacer, Divider} from "@chakra-ui/react";
import { QuorumBlock } from "../Types/Explorer";

interface IProps {
  block: QuorumBlock;
  closeToast: any
}

export default function ExplorerBlockToast({block, closeToast}: IProps) {

  return(
    <Box color='white' p={3} bg='#2c56dd'>
      <HStack>
        <Text fontSize="sm" as="b" textAlign="left">Block:&nbsp;&nbsp; {block.number}</Text>
        <Spacer />
        <Box as='button' onClick={closeToast} borderRadius='md' bg='tomato' color='white' px={3} h={8}>x</Box> 
      </HStack>
      <Divider my={4}/>
      <Text fontSize="sm" textAlign="left">Hash:&nbsp; {block.hash}</Text> 
      <Text fontSize="sm" textAlign="left">Transactions:&nbsp; {block.transactions.length}</Text>
      <Text fontSize="sm" textAlign="left">Uncles:&nbsp; {block.uncles.length}</Text>
      <Text fontSize="sm" textAlign="left">Size:&nbsp; {block.size}</Text>
      <Text fontSize="sm" textAlign="left">Gas Used:&nbsp; {block.gasUsed}</Text>
      <Text fontSize="sm" textAlign="left">Timestamp:&nbsp; {block.timestamp}</Text>
      <Text fontSize="sm" textAlign="left">State Root:&nbsp; {block.stateRoot}</Text>
      <Text fontSize="sm" textAlign="left">Receipt Root:&nbsp; {block.receiptsRoot}</Text>
      <Text fontSize="sm" textAlign="left">Tx Root:&nbsp; {block.transactionsRoot}</Text>
    </Box>
  );

}

