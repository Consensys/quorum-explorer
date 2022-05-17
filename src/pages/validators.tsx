import { useCallback, useEffect, useState, useRef } from "react";
import { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import AccessDenied from "../common/components/Misc/AccessDenied";
import { Divider, Container, SimpleGrid } from "@chakra-ui/react";
import PageHeader from "../common/components/Misc/PageHeader";
import axios from "axios";
import { QuorumConfig, QuorumNode } from "../common/types/QuorumConfig";
import ValidatorsActive from "../common/components/Validators/ValidatorsActive";
import ValidatorsPending from "../common/components/Validators/ValidatorsPending";
import ValidatorsPropose from "../common/components/Validators/ValidatorsPropose";
import ValidatorsAbout from "../common/components/Validators/ValidatorAbout";
import { getDetailsByNodeName } from "../common/lib/quorumConfig";
import { refresh3s } from "../common/lib/common";
import { configReader } from "../common/lib/getConfig";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

interface IState {
  selectedNode: string;
  rpcUrl: string;
  minersList: string[];
  pendingList: string[];
}

interface IProps {
  config: QuorumConfig;
}

export default function Validators({ config }: IProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const controller = new AbortController();
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [validators, setValidators] = useState<IState>({
    selectedNode: config.nodes[0].name,
    rpcUrl: config.nodes[0].rpcUrl,
    minersList: [],
    pendingList: [],
  });

  const nodeInfoHandler = useCallback(async (node: string) => {
    const needle: QuorumNode = getDetailsByNodeName(config, node);

    return Promise.all([
      axios({
        method: "POST",
        url: `/api/validatorsGetCurrent`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          rpcUrl: needle.rpcUrl,
          client: needle.client,
          algorithm: config.algorithm,
        }),
        signal: controller.signal,
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      }),

      axios({
        method: "POST",
        url: `/api/validatorsGetPendingVotes`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          rpcUrl: needle.rpcUrl,
          client: needle.client,
          algorithm: config.algorithm,
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      }),
    ])
      .then(([currentVal, pendingVal]) => {
        setValidators({
          selectedNode: node,
          rpcUrl: needle.rpcUrl,
          minersList: currentVal.data.validators,
          pendingList: pendingVal.data.validators,
        });
      })
      .catch((err) => {
        if (err.status === 401) {
          console.error(`${err.status} Unauthorized`);
        }
        setValidators({
          selectedNode: node,
          rpcUrl: needle.rpcUrl,
          minersList: [],
          pendingList: [],
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    nodeInfoHandler(validators.selectedNode);
    intervalRef.current = setInterval(() => {
      nodeInfoHandler(validators.selectedNode);
      console.log("validators > called for new info...");
    }, refresh3s);

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators.selectedNode]);

  const handleSelectNode = (e: any) => {
    controller.abort();
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setValidators({ ...validators, selectedNode: e.target.value });
  };
  if (typeof window !== "undefined" && loading) return null;
  if (!session && publicRuntimeConfig.DISABLE_AUTH === "false") {
    return <AccessDenied />;
  }
  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Validators"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <Divider my={8} />
        <SimpleGrid columns={2} minChildWidth="600px">
          <ValidatorsAbout />
          <ValidatorsActive
            config={config}
            minersList={validators.minersList}
            selectedNode={validators.selectedNode}
          />
          <ValidatorsPropose
            config={config}
            selectedNode={validators.selectedNode}
          />
          <ValidatorsPending
            config={config}
            pendingList={validators.pendingList}
            selectedNode={validators.selectedNode}
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
