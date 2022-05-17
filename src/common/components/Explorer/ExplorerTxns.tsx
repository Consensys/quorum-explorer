import React, { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Input,
  Flex,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import ExplorerTxnCard from "./ExplorerTxnCard";
import ExplorerTxnToast from "./ExplorerTxnToast";
import { QuorumTxn } from "../../types/Explorer";
import { motion } from "framer-motion";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

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
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios({
      method: "POST",
      url: `/api/txnGetByHash`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        rpcUrl: url,
        txnHash: txnSearch,
      }),
      baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
    });
    var txn: QuorumTxn = res.data as QuorumTxn;
    toastIdRef.current = toast({
      position: "top-right",
      isClosable: true,
      duration: 10000,
      containerStyle: {
        width: "600px",
        maxWidth: "100%",
      },
      render: () => <ExplorerTxnToast txn={txn} closeToast={closeToast} />,
    });
  };

  return (
    <>
      <BoxMotion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        as="section"
        py={{ base: "4", md: "6" }}
        // h={800}
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
            <FormControl as="form" onSubmit={onSubmit}>
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
