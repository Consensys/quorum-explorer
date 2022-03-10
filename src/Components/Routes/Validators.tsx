import React, { Component } from "react";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import PageHeader from "../Misc/PageHeader";
import { Heading, Divider, Th, Thead, Container } from "@chakra-ui/react";

interface IProps {
  config: QuorumConfig;
}

interface IState {
  delay: number;
}

export class Validators extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      delay: 5000,
    };
  }
  intervalId: number = 0;

  handleSelectNode = (e: any) => {
    console.log(e);
    // this.nodeInfoHandler(e);
  };

  render() {
    return (
      <>
        <Container h="100vh" maxW={{ base: "container.sm", md: "container.xl" }}>
          <PageHeader
            title="Validators"
            config={this.props.config}
            selectNodeHandler={this.handleSelectNode}
          />
        </Container>
      </>
    );
  }
}

export default Validators;
