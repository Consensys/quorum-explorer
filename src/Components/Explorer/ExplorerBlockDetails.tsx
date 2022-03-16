import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, Button, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExpand } from "@fortawesome/free-solid-svg-icons"; 
import { QuorumBlock } from '../Types/Explorer'

interface IProps {
  block: QuorumBlock
}

export default function ExplorerBlockDetails({ block }: IProps) {

  return (
    <>
    <Popover>
      <PopoverTrigger>
        <Button p={0} m={0}><FontAwesomeIcon icon={faExpand as IconProp} /></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Block: {block.number}</PopoverHeader>
        <PopoverBody>
          <Text fontSize="xs" isTruncated textAlign="left">Miner:&nbsp; {block.miner}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Hash:&nbsp; {block.hash}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Transactions:&nbsp; {block.transactions.length}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Uncles:&nbsp; {block.uncles.length}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Size:&nbsp; {block.size}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Gas Used:&nbsp; {block.gasUsed}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Timestamp:&nbsp; {block.timestamp}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">State Root:&nbsp; {block.stateRoot}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Receipt Root:&nbsp; {block.receiptsRoot}</Text>
          <Text fontSize="xs" isTruncated textAlign="left">Tx Root:&nbsp; {block.transactionsRoot}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
    </>
  );
}
