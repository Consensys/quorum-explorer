
import React, { Component, ReactElement } from "react";
import { Box, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Text } from "@chakra-ui/react";
import { QuorumBlock } from '../Types/Explorer'

interface IProps {
  block: QuorumBlock
}

interface IState {
}

class BlockAccordianItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                {this.props.block.number}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text fontSize='sm'> Miner: {this.props.block.miner} </Text>
            <Text fontSize='sm'> Transactions: {this.props.block.transactions} </Text>
          </AccordionPanel>
        </AccordionItem>

      </>
    );
  }
}

export default BlockAccordianItem;








              