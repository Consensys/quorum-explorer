import { useState, useRef } from "react";
import { Container } from "@chakra-ui/react";
import PageHeader from "../components/Misc/PageHeader";
import ContractsIndex from "../components/Contracts/ContractsIndex";
import { QuorumConfig } from "../Types/QuorumConfig";

const config: QuorumConfig = require("../Config/config.json");

interface IState {
  selectedNode: string;
}

export default function Contracts() {
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [contracts, setContracts] = useState<IState>({
    selectedNode: config.nodes[0].name,
  });

  const handleSelectNode = (e: any) => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setContracts({ ...contracts, selectedNode: e.target.value });
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Contracts"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <ContractsIndex config={config} selectedNode={contracts.selectedNode} />
      </Container>
    </>
  );
}
