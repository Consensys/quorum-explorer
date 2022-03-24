import { useState } from "react";
import { Container, SimpleGrid} from "@chakra-ui/react";
import PageHeader from "../common/components/Misc/PageHeader";
import WalletsTransferEth from "../common/components/Wallets/WalletsTransferEth"
import { QuorumConfig, QuorumNode } from "../common/types/QuorumConfig";
import { getDetailsByNodeName } from "../common/api/quorumConfig";

const config: QuorumConfig = require("../config/config.json");

interface IState {
  selectedNode: string;
}

export default function Wallets() {
  
  const [wallet, setWallet] = useState<IState>({
    selectedNode: config.nodes[0].name,
  });

  const handleSelectNode = (e: any) => {
    setWallet({ ...wallet, selectedNode: e.target.value });
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Wallets"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <SimpleGrid columns={1} minChildWidth="600px" height="600px">
          <WalletsTransferEth config={config} selectedNode={wallet.selectedNode}  />
        </SimpleGrid>
      </Container>
    </>
  );
}
