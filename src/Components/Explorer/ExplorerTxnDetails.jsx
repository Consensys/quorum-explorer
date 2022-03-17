import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

export default function ExplorerTxnDetails({ txn }) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button p={0} m={0}>
            <FontAwesomeIcon icon={faExpand} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Txn: {txn.hash}</PopoverHeader>
          <PopoverBody>
            <Text fontSize="xs" isTruncated textAlign="left">
              Block Number:&nbsp; {txn.blockNumber}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Block Hash:&nbsp; {txn.blockHash}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              From:&nbsp; {txn.from}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              To:&nbsp; {txn.to}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Gas:&nbsp; {txn.gas}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Gas Price:&nbsp; {txn.gasPrice}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Value:&nbsp; {txn.value}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Input:&nbsp; {txn.input}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Nonce:&nbsp; {txn.nonce}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Txn Index:&nbsp; {txn.transactionIndex}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              R:&nbsp; {txn.r}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              S:&nbsp; {txn.s}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              V:&nbsp; {txn.v}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
