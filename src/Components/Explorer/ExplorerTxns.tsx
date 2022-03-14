import React, { Component, useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Input,
  HStack,
  Spacer,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import ExplorerTxnCard from "./ExplorerTxnCard";
import ExplorerTxnToast from "./ExplorerTxnToast";
import { QuorumTxn } from "../Types/Explorer";
import { getTxnByHash } from "../API/Explorer";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  txns: QuorumTxn[];
  url: string;
}

export default function ExplorerTxns({ txns, url }: IProps) {
  const [txnSearch, setTxnSearch] = useState("");
  const toast = useToast();
  const toastIdRef: any = React.useRef();

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  const onChange = (e: any) => {
    setTxnSearch(e.target.value);
    console.log(txnSearch);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const txn = await getTxnByHash(url, txnSearch);
    // console.log(txn);
    toastIdRef.current = toast({
      position: "top-right",
      isClosable: true,
      duration: 10000,
      render: () => <ExplorerTxnToast txn={txn} closeToast={closeToast} />,
    });
  };

  const txnSearchSubmitHandler = (e: any) => {
    e.preventDefault();
    // const txn = await getBlockByNumber(this.props.url, this.state.txnSearch);
  };

  return (
    <>
      <BoxMotion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        as="section"
        py={{ base: "4", md: "6" }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
          mb={6}
          mx="16px"
        >
          <Text as="b" fontSize="lg">
            Transactions
          </Text>
          {/* <Spacer /> */}
          <Container maxW="20%" m={0} p={0}>
            <FormControl onSubmit={onSubmit}>
              <Input
                placeholder={"Search by transaction hash"}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            </FormControl>
          </Container>
        </Flex>

        <SimpleGrid columns={{ base: 1 }} gap={{ base: "5", md: "6" }}>
          {txns.map((txn) => (
            <ExplorerTxnCard key={txn.hash} txn={txn} />
          ))}
        </SimpleGrid>
      </BoxMotion>
    </>
  );
}
