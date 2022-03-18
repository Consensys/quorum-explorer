import { useCallback, useEffect, useState, useRef } from "react";
import { Divider, Container, SimpleGrid } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import ValidatorsActive from "../Validators/ValidatorsActive";
import ValidatorsPending from "../Validators/ValidatorsPending";
import ValidatorsPropose from "../Validators/ValidatorsPropose";
import ValidatorsAbout from "../Validators/ValidatorAbout";
import { getCurrentValidators, getPendingVotes } from "../../API/Validators";
import { getDetailsByNodeName } from "../../API/QuorumConfig";

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
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toContinue = useRef(true);
  const refreshFrequency: number = 1000;
  const [validators, setValidators] = useState<IState>({
    selectedNode: props.config.nodes[0].name,
    rpcUrl: props.config.nodes[0].rpcUrl,
    minersList: [],
    pendingList: [],
  });

  const nodeInfoHandler = useCallback(async (node: string) => {
    const needle: QuorumNode = getDetailsByNodeName(props.config, node);
    const rpcUrl: string = needle.rpcUrl;
    const client: string = needle.client;
    const currentValidators = await getCurrentValidators(rpcUrl);
    const pendingValidators = await getPendingVotes(
      rpcUrl,
      client,
      props.config.algorithm
    );
    if (toContinue.current) {
      setValidators({
        selectedNode: node,
        rpcUrl: rpcUrl,
        minersList: currentValidators,
        pendingList: pendingValidators,
      });
    }
  }, []);

  useEffect(() => {
    toContinue.current = true;
    console.log(validators);
    nodeInfoHandler(validators.selectedNode);
    intervalRef.current = setInterval(() => {
      nodeInfoHandler(validators.selectedNode);
      console.log("called for new info...");
    }, refreshFrequency);

    return () => {
      toContinue.current = false;
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators.selectedNode]);

  const handleSelectNode = (e: any) => {
    toContinue.current = false;
    clearInterval(intervalRef.current as NodeJS.Timeout);
    console.log("cleaned up: " + intervalRef.current);
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
