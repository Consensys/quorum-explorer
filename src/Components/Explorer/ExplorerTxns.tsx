import React, { Component } from "react";
import { Box, Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { QuorumTxn } from "../Types/Explorer";
import { motion } from "framer-motion";
import ExplorerTxnCard from "./ExplorerTxnCard";
const BoxMotion = motion(Box);

interface IProps {
  txns: QuorumTxn[];
}

interface IState {}

class ExplorerTxns extends Component<IProps, IState> {
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
          <Text as="b" fontSize="lg">Transactions</Text>
            <SimpleGrid
              columns={{ base: 1 }}
              gap={{ base: "5", md: "6" }}
            >
              {this.props.txns.map((txn) => (
                <ExplorerTxnCard key={txn.hash} txn={txn} />
              ))}
            </SimpleGrid>


          </Container>
        </BoxMotion>
      </>
    );
  }
}

export default ExplorerTxns;
