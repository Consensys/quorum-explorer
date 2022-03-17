import React, { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Input,
  Flex,
  FormControl,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import ExplorerBlockCard from "./ExplorerBlockCard";
import ExplorerBlockToast from "./ExplorerBlockToast";
import { getBlockByNumber } from "../API/Explorer";
import { motion } from "framer-motion";

const BoxMotion = motion(Box);

export default function ExplorerBlocks({ blocks, url }) {
  const [blockSearch, setBlockSearch] = useState("");
  const toast = useToast();
  const toastIdRef = React.useRef();

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  const onChange = (e) => {
    setBlockSearch(e.target.value);
    // console.log(blockSearch);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const block = await getBlockByNumber(url, blockSearch);
    // console.log(block);
    toastIdRef.current = toast({
      position: "top-right",
      isClosable: true,
      duration: 10000,
      render: () => (
        <ExplorerBlockToast block={block} closeToast={closeToast} />
      ),
    });
  };

  return (
    <>
      <BoxMotion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        as="section"
        py="16px"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
          mb={6}
          mx="16px"
        >
          <Text as="b" fontSize="lg">
            Blocks
          </Text>
          <Container maxW="20%" m={0} p={0}>
            <FormControl as="form" onSubmit={onSubmit}>
              <Input
                placeholder={"Search by block number"}
                onInput={onChange}
                onSubmit={onSubmit}
              />
            </FormControl>
          </Container>
        </Flex>
        <Container maxW={{ base: "container.sm", md: "container.xl" }}>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "5", md: "6" }}>
            {blocks.map((block) => (
              <ExplorerBlockCard key={block.number} block={block} />
            ))}
          </SimpleGrid>
        </Container>
      </BoxMotion>
    </>
  );
}