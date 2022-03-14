import React, { Component } from "react";
import { Box, Container, SimpleGrid, Text, Input, HStack, Spacer} from "@chakra-ui/react";
import ExplorerBlockCard from "./ExplorerBlockCard";
import { QuorumBlock } from "../Types/Explorer";
import { getBlockByNumber } from "../API/Explorer";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  blocks: QuorumBlock[];
  url: string
}

interface IState {
  blockSearch: string;
}

class ExplorerBlocks extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      blockSearch: "0x0",
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e:any) => {
    this.setState({
      blockSearch: e.target.value,
    });
    console.log(this.state);
  }

  onSubmit = async (e:any) => {
    e.preventDefault();
    const block = await getBlockByNumber(this.props.url, this.state.blockSearch)
    console.log(block);    
  }

  render() {
    return (
      <>
        <BoxMotion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          as="section"
          py={{ base: "4", md: "9" }}
        >
          <Container maxW={{ base: "container.sm", md: "container.xl" }}>
            <HStack spacing={5} p={2}>
            <Text as="b" fontSize="lg">Blocks</Text>
            <Spacer />
            <form onSubmit={this.onSubmit}>
              <Input
                placeholder={'Search by block hash or number'}
                onInput={this.onChange}
                onSubmit={this.onSubmit}
                size='md'
                width='400'
              />
            </form>;
            </HStack>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              gap={{ base: "5", md: "6" }}
            >
              {this.props.blocks.map((block) => (
                <ExplorerBlockCard key={block.number} block={block} />
              ))}
            </SimpleGrid>
          </Container>
        </BoxMotion>
      </>
    );
  }
}

export default ExplorerBlocks;
