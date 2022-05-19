import { useState } from "react";
import { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import AccessDenied from "../common/components/Misc/AccessDenied";
import { Container, SimpleGrid } from "@chakra-ui/react";
import PageHeader from "../common/components/Misc/PageHeader";
import WalletsTransferEth from "../common/components/Wallets/WalletsTransferEth";
import { QuorumConfig } from "../common/types/QuorumConfig";
import { configReader } from "../common/lib/getConfig";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

interface IState {
  selectedNode: string;
}

interface IProps {
  config: QuorumConfig;
}

export default function Wallets({ config }: IProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [wallet, setWallet] = useState<IState>({
    selectedNode: config.nodes[0].name,
  });

  const handleSelectNode = (e: any) => {
    setWallet({ ...wallet, selectedNode: e.target.value });
  };
  if (typeof window !== "undefined" && loading) return null;
  if (!session && publicRuntimeConfig.DISABLE_AUTH === "false") {
    return <AccessDenied />;
  }
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

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const res = await configReader();
  const config: QuorumConfig = JSON.parse(res);
  return {
    props: {
      config,
      session: await getSession(context),
    },
  };
};
