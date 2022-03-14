import React, { Component, useState } from "react";
import { Box, Container, SimpleGrid, Text, Input, HStack, Spacer, Button} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import ExplorerBlockCard from "./ExplorerBlockCard";
import { QuorumBlock } from "../Types/Explorer";
import { getBlockByNumber } from "../API/Explorer";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  blocks: QuorumBlock[];
  url: string
}

export default function ExplorerBlocks({blocks, url}: IProps) {
  const [blockSearch, setBlockSearch] = useState(0);

  const toast = useToast()
  const toastIdRef : any = React.useRef()

  const onChange = (e:any) => {
    setBlockSearch(e.target.value);
    console.log(blockSearch);
  }

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
  }

  const onSubmit = async (e:any) => {
    e.preventDefault();
    const block = await getBlockByNumber(url, blockSearch)
    console.log(block);    
    toastIdRef.current =  toast({
      position: 'top-right',
      isClosable: true,
      duration: 9000,
      render: () => (
        <Box color='white' p={3} bg='blue.500'>
          Hello World
          <Button onClick={closeToast} p={0} m={0} type='button' variant='outline'>x</Button>  
        </Box>
      ),
    })  }

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
                placeholder={'Search by block hash or number'}
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


