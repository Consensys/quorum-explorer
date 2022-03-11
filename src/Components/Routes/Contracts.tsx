import React, { Component } from "react";
import { Heading, Container } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";

interface IProps {
  config: QuorumConfig;
}

interface IState {}

export class Contracts extends Component<IProps, IState> {
  
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
            title="Contracts"
            config={this.props.config}
            selectNodeHandler={this.handleSelectNode}
          />
        </Container>
      </>
    );
  }
}

export default Contracts;
