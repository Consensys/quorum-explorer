import React, { Component, ReactElement } from "react";
import { QuorumBlock } from '../Types/Explorer'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Text, 
} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons"; 

interface IProps {
  block: QuorumBlock
}

interface IState {}

class ExplorerBlockDetails extends Component<IProps, IState> {
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
          <PopoverHeader>Block: {this.props.block.number}!</PopoverHeader>
          <PopoverBody>
            <Text fontSize="xs" isTruncated textAlign="left">Miner:&nbsp; {this.props.block.miner}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Hash:&nbsp; {this.props.block.hash}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Transactions:&nbsp; {this.props.block.transactions.length}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Uncles:&nbsp; {this.props.block.uncles.length}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Size:&nbsp; {this.props.block.size}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Gas Used:&nbsp; {this.props.block.gasUsed}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Timestamp:&nbsp; {this.props.block.timestamp}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">State Root:&nbsp; {this.props.block.stateRoot}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Receipt Root:&nbsp; {this.props.block.receiptsRoot}</Text>
            <Text fontSize="xs" isTruncated textAlign="left">Tx Root:&nbsp; {this.props.block.transactionsRoot}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      </>
    );
  }
}

export default ExplorerBlockDetails;
