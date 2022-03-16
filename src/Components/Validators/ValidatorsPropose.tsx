import React, { Component } from "react";
import {
  Heading,
  Flex,
  Center,
  Text,
  Skeleton,
  Box,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { QuorumConfig } from "../Types/QuorumConfig";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface IProps {
  config: QuorumConfig;
  minersList: string[];
}

interface IState {}

export class ValidatorsPropose extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          borderRadius="lg"
          borderWidth={2}
          p={5}
          mx={2}
          my={3}
        >
          <Center>
            <Heading size="lg" mb={5}>
              Propose Validators
            </Heading>
          </Center>
          {this.props.minersList.length > 0 ? (
            this.props.minersList.map((miner) => {
              return (
                <>
                  <Flex m={3} justifyContent="center" alignItems="center">
                    <Text>{miner}</Text>
                    <Spacer />
                    <Button>Propose Validator</Button>
                  </Flex>
                </>
              );
            })
          ) : (
            <>
              <Skeleton h="20px" m={2} />
              <Skeleton h="20px" m={2} />
              <Skeleton h="20px" m={2} />
              <Skeleton h="20px" m={2} />
            </>
          )}
        </MotionBox>
      </>
    );
  }
}

export default ValidatorsPropose;
