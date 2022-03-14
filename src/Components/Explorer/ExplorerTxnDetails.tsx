import React, { Component, ReactElement } from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, Button, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons"; 
import { QuorumTxn } from '../Types/Explorer'

interface IProps {
  txn: QuorumTxn
}

interface IState {}

class ExplorerTxnDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
      <Popover>
        <PopoverTrigger>
          <Button p={0} m={0}><FontAwesomeIcon icon={faExpand} /></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Txn: {this.props.txn.hash}</PopoverHeader>
          <PopoverBody>
            <Text fontSize="xs" isTruncated textAlign="left">Block Number:&nbsp; {this.props.txn.blockNumber}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Block Hash:&nbsp; {this.props.txn.blockHash}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">From:&nbsp; {this.props.txn.from}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">To:&nbsp; {this.props.txn.to}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Gas:&nbsp; {this.props.txn.gas}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Gas Price:&nbsp; {this.props.txn.gasPrice}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Value:&nbsp; {this.props.txn.value}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Input:&nbsp; {this.props.txn.input}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Nonce:&nbsp; {this.props.txn.nonce}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Txn Index:&nbsp; {this.props.txn.transactionIndex}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">R:&nbsp; {this.props.txn.r}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">S:&nbsp; {this.props.txn.s}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">V:&nbsp; {this.props.txn.v}</Text>

          </PopoverBody>
        </PopoverContent>
      </Popover>
      </>
    );
  }
}

export default ExplorerTxnDetails;
