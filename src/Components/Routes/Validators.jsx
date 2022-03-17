import React, { useCallback, useEffect, useState, useRef } from "react";
import { Divider, Container, SimpleGrid } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import ValidatorsActive from "../Validators/ValidatorsActive";
import ValidatorsPending from "../Validators/ValidatorsPending";
import ValidatorsPropose from "../Validators/ValidatorsPropose";
import ValidatorsAbout from "../Validators/ValidatorAbout";
import { getCurrentValidators, getPendingVotes } from "../API/Validators";
import { getDetailsByNodeName } from "../API/QuorumConfig";

export default function Validators(props) {
  const intervalRef = useRef(null);
  const [validators, setValidators] = useState({
    selectedNode: props.config.nodes[0].name,
    rpcUrl: props.config.nodes[0].rpcUrl,
    minersList: [],
    pendingList: [],
  });

  const nodeInfoHandler = useCallback(
    async (node) => {
      const needle = getDetailsByNodeName(props.config, node);
      const rpcUrl = needle.rpcUrl;
      const client = needle.client;
      const currentValidators = await getCurrentValidators(rpcUrl);
      const pendingValidators = await getPendingVotes(
        rpcUrl,
        client,
        props.config.algorithm
      );

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
    console.log("first render");
    nodeInfoHandler(validators.selectedNode);
    intervalRef.current = setInterval(() => {
      nodeInfoHandler(validators.selectedNode);
      console.log("called for new info...");
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [nodeInfoHandler, validators.selectedNode]);

  const handleSelectNode = (e) => {
    console.log("cleaning up:" + intervalRef.current);
    clearInterval(intervalRef.current);
    setValidators({ ...validators, selectedNode: e.target.value });
    // need to clear the interval here
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
            selectedNode={validators.selectedNode}
          />
          <ValidatorsPropose
            config={props.config}
            selectedNode={validators.selectedNode}
          />
          <ValidatorsPending
            config={props.config}
            pendingList={validators.pendingList}
            selectedNode={validators.selectedNode}
          />
        </SimpleGrid>
      </Container>
    </>
  );
}
