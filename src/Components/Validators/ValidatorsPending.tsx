import React, { Component } from "react";
import { Heading, Divider, Container, Flex } from "@chakra-ui/react";

interface IProps {}

interface IState {}

export class ValidatorsPending extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Heading>Pending Validators</Heading>
      </>
    );
  }
}

export default ValidatorsPending;
