import React, { Component, useCallback, useEffect, useState } from "react";
import {
  Heading,
  Divider,
  Container,
  Box,
  HStack,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { ValidatorsActive } from "../Validators/ValidatorsActive";
import { ValidatorsPending } from "../Validators/ValidatorsPending";
import { ValidatorsPropose } from "../Validators/ValidatorsPropose";
import ValidatorsAbout from "../Validators/ValidatorAbout";
import {
  getCurrentValidators,
  getPendingVotes,
  proposeValidator,
} from "../API/Validators";
import { getDetailsByNodeName } from "../API/QuorumConfig";
import { updateNodeInfo } from "../API/Nodes";

// Check consensus mechanism -- will then depend on what APIs we use
// getPendingVotes, getValidatorsByBlockNumber, proposeValidatorVote (QBFT, Clique, IBFT2)
// https://consensys.net/docs/goquorum/en/latest/reference/api-methods/#istanbul_getvalidators
// https://consensys.net/docs/goquorum/en/latest/reference/api-methods/#raft_leader

// UI: Current list of validators (button for revoking?), any pending votes (with button to discard pending vote), list of non-validators with buttons to propose new validator

interface IProps {
  config: QuorumConfig;
}

interface IState {
  selectedNode: string;
  rpcUrl: string;
  minersList: string[];
  pendingList: string[];
}

export default function Validators(props: IProps) {
  const [validators, setValidators] = useState<IState>({
    selectedNode: props.config.nodes[0].name,
    rpcUrl: props.config.nodes[0].rpcUrl,
    minersList: [],
    pendingList: [],
  });

  const nodeInfoHandler = useCallback(
    async (node: string) => {
      const needle: QuorumNode = getDetailsByNodeName(props.config, node);
      const rpcUrl: string = needle.rpcUrl;
      // const res = await updateNodeInfo(rpcUrl);
      const currentValidators = await getCurrentValidators(rpcUrl);
      const pendingValidators = await getPendingVotes(props.config);

      setValidators({
        selectedNode: node,
        rpcUrl: rpcUrl,
        minersList: currentValidators,
        pendingList: pendingValidators,
      });
    },
    [props.config]
  );

  useEffect(() => {
    console.log("component rendered to screen");
    nodeInfoHandler(validators.selectedNode);
    const interval = setInterval(() => {
      nodeInfoHandler(validators.selectedNode);
    }, 5000);

    return () => clearInterval(interval);
  }, [nodeInfoHandler, validators.selectedNode]);

  const handleSelectNode = (e: any) => {
    console.log(e);
    setValidators({ ...validators, selectedNode: e.target.value });
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Validators"
          config={props.config}
          selectNodeHandler={handleSelectNode}
        />
        <Divider my={8} />
        <SimpleGrid columns={2} minChildWidth="600px">
          <ValidatorsAbout />
          <ValidatorsActive
            config={props.config}
            minersList={validators.minersList}
          />
          <ValidatorsPending
            config={props.config}
            pendingList={validators.pendingList}
          />
          <ValidatorsPropose
            config={props.config}
            minersList={validators.minersList}
          />
        </SimpleGrid>
      </Container>
    </>
  );
}
