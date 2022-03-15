import React, { Component } from "react";
import {
  Heading,
  Container,
  HStack,
  Box,
  Flex,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { QuorumConfig } from "../Types/QuorumConfig";
import { getNodeKeys, getDetailsByNodeName } from "../API/QuorumConfig";
import { motion } from "framer-motion";
const MotionContainer = motion(Container);

interface IProps {
  title: string;
  config: QuorumConfig;
  selectNodeHandler: any;
  isLoading?: boolean;
}

export default function PageHeader({ title, config, selectNodeHandler }: IProps) {

  const nodeKeys: string[] = getNodeKeys(config);

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
<<<<<<< HEAD
          <Box>
            <Heading as="h1" size="lg" textAlign="center">
              {title}
            </Heading>
          </Box>
          <Box alignItems="center">
            <HStack>
              <FontAwesomeIcon icon={faSlidersH as IconProp} fontSize="lg" />
              <Select
                size="lg"
                variant="filled"
                onChange={selectNodeHandler}
              >
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
  
=======
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={5}
          >
            <HStack>
              <Heading as="h1" size="lg" textAlign="center">
                {this.props.title}
              </Heading>
              {this.props.isLoading && <Spinner color="red.500" />}
            </HStack>
            <Box alignItems="center">
              <HStack>
                <FontAwesomeIcon icon={faSlidersH} fontSize="lg" />
                <Select
                  size="lg"
                  variant="filled"
                  onChange={this.props.selectNodeHandler}
                >
                  {this.nodeKeys.map((node) => (
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
>>>>>>> 4261b90 (general layout, need to implement api funcs)
}

