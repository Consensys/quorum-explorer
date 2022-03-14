import React, { Component } from "react";
import { Heading, Divider, Container, Flex } from "@chakra-ui/react";

interface IProps {}

interface IState {}

export class ValidatorsPropose extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Heading>Propose Validator</Heading>
      </>
    );
  }
}

export default ValidatorsPropose;
