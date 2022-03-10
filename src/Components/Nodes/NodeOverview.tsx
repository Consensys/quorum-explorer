import React, { Component } from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import NodeCard from "./NodeCard";
import { Cards } from "../Types/Nodes";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  stats: Cards[];
  statusText: string;
}

interface IState {}

class NodeOverview extends Component<IProps, IState> {
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
              gap={{ base: "5", md: "7" }}
            >
              {this.props.stats.map(({ label, value, icon }) => (
                <NodeCard
                  key={label}
                  title={label}
                  text={value}
                  icon={icon}
                  statusText={this.props.statusText}
                />
              ))}
            </SimpleGrid>
          </Container>
        </BoxMotion>
      </>
    );
  }
}

export default NodeOverview;
