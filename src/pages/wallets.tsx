import { useState } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import PageHeader from "../common/components/Misc/PageHeader";
import WalletsTransferEth from "../common/components/Wallets/WalletsTransferEth";
import { QuorumConfig } from "../common/types/QuorumConfig";
import { configReader } from "../common/lib/getConfig";

interface IState {
  selectedNode: string;
}

interface IProps {
  config: QuorumConfig;
}

export default function Wallets({ config }: IProps) {
  const [wallet, setWallet] = useState<IState>({
    selectedNode: config.nodes[0].name,
  });

  const handleSelectNode = (e: any) => {
    setWallet({ ...wallet, selectedNode: e.target.value });
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.sm" }}>
        <PageHeader
          title="Wallets"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <SimpleGrid columns={1} minChildWidth="300px">
          <WalletsTransferEth
            config={config}
            selectedNode={wallet.selectedNode}
          />
        </SimpleGrid>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const res = await configReader();
  const config: QuorumConfig = JSON.parse(res);
  return { props: { config } };
}
