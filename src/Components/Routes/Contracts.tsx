import { useState, useRef } from "react";
import { Container } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import { QuorumConfig } from "../Types/QuorumConfig";

interface IProps {
  config: QuorumConfig;
}

interface IState {
  selectedNode: string;
}

export default function Contracts(props: IProps) {
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [contracts, setContracts] = useState<IState>({
    selectedNode: props.config.nodes[0].name,
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
          config={props.config}
          selectNodeHandler={handleSelectNode}
        />
      </Container>
    </>
  );
}
