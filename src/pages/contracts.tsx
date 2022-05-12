import { useState, useRef, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import PageHeader from "../common/components/Misc/PageHeader";
import ContractsIndex from "../common/components/Contracts/ContractsIndex";
import { QuorumConfig } from "../common/types/QuorumConfig";
import { configReader } from "../common/lib/getConfig";

interface IState {
  selectedNode: string;
}

interface IProps {
  config: QuorumConfig;
}

export default function Contracts({ config }: IProps) {
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

export async function getServerSideProps() {
  const res = await configReader();
  const config: QuorumConfig = JSON.parse(res);
  return { props: { config } };
}
