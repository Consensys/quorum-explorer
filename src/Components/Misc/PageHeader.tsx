
import React, { Component } from "react";
import { Heading, Divider, Container, Center, HStack, Select, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { QuorumConfig } from "../Types/QuorumConfig";
import { getNodeKeys, getDetailsByNodeName } from '../API/QuorumConfig';
const MotionContainer = motion(Container);

interface IProps {
  title: string,
  config: QuorumConfig,
  selectNodeHandler: any
}

interface IState {
}

class PageHeader extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }
  nodeKeys: string[] = getNodeKeys(this.props.config);


  render(){
    return (
      <>
        <MotionContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Heading as="h1" size="xl" m={3} textAlign="center">
            {this.props.title}
          </Heading>
          <Center>
            <Divider maxW="40vw" alignContent="center" />
          </Center>
          <HStack>
              <Text minW="max" fontSize="lg" color="muted">
                Node:
              </Text>
              <Select variant="filled" onChange={this.props.selectNodeHandler}>
                {this.nodeKeys.map((node) => (
                  <option key={node} value={node}>
                    {node}
                  </option>
                ))}
              </Select>
            </HStack>
        </MotionContainer>
      </>
    );
  }
}

export default PageHeader;