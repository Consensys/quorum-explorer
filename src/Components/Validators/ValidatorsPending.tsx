import React, { Component } from "react";
import { Heading, Center, Text, Skeleton, Box } from "@chakra-ui/react";
import { QuorumConfig } from "../Types/QuorumConfig";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface IProps {
  config: QuorumConfig;
  minersList: string[];
}

interface IState {}

export class ValidatorsPending extends Component<IProps, IState> {
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
              Pending Validators
            </Heading>
          </Center>
          {this.props.minersList.length > 0 ? (
            this.props.minersList.map((miner) => {
              return (
                <>
                  <Center m={5}>
                    <Text>{miner}</Text>
                  </Center>
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

export default ValidatorsPending;
