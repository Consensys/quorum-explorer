import React from "react";
import {
  Heading,
  Container,
  HStack,
  Box,
  Flex,
  Select,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { getNodeKeys } from "../API/QuorumConfig";
import { motion } from "framer-motion";
const MotionContainer = motion(Container);

export default function PageHeader({ title, config, selectNodeHandler }) {
  const nodeKeys = getNodeKeys(config);

  return (
    <>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        maxW={{ base: "container.sm", md: "container.xl" }}
      >
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt={5}
        >
          <Box>
            <Heading as="h1" size="lg" textAlign="center">
              {title}
            </Heading>
          </Box>
          <Box alignItems="center">
            <HStack>
              <FontAwesomeIcon icon={faSlidersH} fontSize="lg" />
              <Select size="lg" variant="filled" onChange={selectNodeHandler}>
                {nodeKeys.map((node) => (
                  <option key={node} value={node}>
                    {node}
                  </option>
                ))}
              </Select>
            </HStack>
          </Box>
        </Flex>
      </MotionContainer>
    </>
  );
}
