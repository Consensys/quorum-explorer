import React, { Component } from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
  Spacer,
  Box,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { QuorumConfig } from "../Types/QuorumConfig";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
interface IProps {
  config: QuorumConfig;
  minersList: string[];
}

interface IState {}

export class ValidatorsActive extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  handleClick = (e: any) => {
    console.log(e);
  };

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
          <Center mb={5}>
            <Heading size="lg">Active Validators</Heading>
          </Center>
          {this.props.minersList.length > 0 ? (
            this.props.minersList.map((miner, i) => {
              return (
                <>
                  <Flex
                    key={i}
                    m={3}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text>{miner}</Text>
                    <Spacer />
                    <Button onClick={() => this.handleClick(miner)}>
                      Remove Validator
                    </Button>
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

export default ValidatorsActive;
