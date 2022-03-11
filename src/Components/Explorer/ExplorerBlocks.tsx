import React, { Component } from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import ExplorerCard from "./ExplorerCard";
import { QuorumBlock } from "../Types/Explorer";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  blocks: QuorumBlock[];
}

interface IState {}

class ExplorerBlocks extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
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
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              gap={{ base: "5", md: "6" }}
            >
              {this.props.blocks.map((block) => (
                <ExplorerCard block={block} />
              ))}
            </SimpleGrid>
          </Container>
        </BoxMotion>
      </>
    );
  }
}

export default ExplorerBlocks;
