import React, { Component } from "react";
import { Box, Container, SimpleGrid, Text, Input, HStack, Spacer} from "@chakra-ui/react";
import ExplorerTxnCard from "./ExplorerTxnCard";
import { QuorumTxn } from "../Types/Explorer";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  txns: QuorumTxn[];
  url: string;
}

interface IState {
  txnSearch: string;
}

class ExplorerTxns extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.setState({
      txnSearch: ''
    });
  }

  txnSearchChangeHandler= (e:any) => {
    this.setState({txnSearch: e.target.value});
  }

  txnSearchSubmitHandler= (e:any) => {
    e.preventDefault();
    // const txn = await getBlockByNumber(this.props.url, this.state.txnSearch);

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
            <Text as="b" fontSize="lg">Transactions</Text>
            <Spacer />
            <form onSubmit={this.txnSearchSubmitHandler}>
              <Input
                placeholder={'Search by block hash or number'}
                onChange={this.txnSearchChangeHandler}
                onSubmit={this.txnSearchSubmitHandler}
                size='md'
                width='400'
              />
            </form>;
            </HStack>
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
