import React, { Component, useState } from "react";
import { Box, Container, SimpleGrid, Text, Input, HStack, Spacer } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import ExplorerBlockCard from "./ExplorerBlockCard";
import ExplorerBlockToast from "./ExplorerBlockToast";
import { QuorumBlock } from "../Types/Explorer";
import { getBlockByNumber } from "../API/Explorer";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  blocks: QuorumBlock[];
  url: string
}

export default function ExplorerBlocks({blocks, url}: IProps) {
  const [blockSearch, setBlockSearch] = useState("");
  const toast = useToast()
  const toastIdRef : any = React.useRef()

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
  }
  
  const onChange = (e:any) => {
    setBlockSearch(e.target.value);
    console.log(blockSearch);
  }

  const onSubmit = async (e:any) => {
    e.preventDefault();
    const block = await getBlockByNumber(url, blockSearch)
    // console.log(block);    
    toastIdRef.current =  toast({
      position: 'top-right',
      isClosable: true,
      duration: 10000,
      render: () => (
        <ExplorerBlockToast block={block} closeToast={closeToast}/>
      ),
    })  
  }

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
            <form onSubmit={onSubmit}>
              <Input
                placeholder={'Search by block number or hash'}
                onInput={onChange}
                onSubmit={onSubmit}
                size='md'
                width='400'
              />
            </form>;
            </HStack>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              gap={{ base: "5", md: "6" }}
            >
              {blocks.map((block) => (
                <ExplorerBlockCard key={block.number} block={block} />
              ))}
            </SimpleGrid>
          </Container>
        </BoxMotion>
      </>
  );
  
}


