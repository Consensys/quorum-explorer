import { useState, useEffect, useCallback, useRef } from "react";
import { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import AccessDenied from "../common/components/Misc/AccessDenied";
import { Button, Container, Divider } from "@chakra-ui/react";
import ExplorerBlocks from "../common/components/Explorer/ExplorerBlocks";
import ExplorerTxns from "../common/components/Explorer/ExplorerTxns";
import PageHeader from "../common/components/Misc/PageHeader";
import { QuorumBlock, QuorumTxn } from "../common/types/Explorer";
import { QuorumConfig, QuorumNode } from "../common/types/QuorumConfig";
import { getDetailsByNodeName } from "../common/lib/quorumConfig";
import { refresh5s } from "../common/lib/common";
import { range } from "../common/lib/explorer";
import { configReader } from "../common/lib/getConfig";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import axios from "axios";

interface IState {
  selectedNode: string;
  blocks: QuorumBlock[];
  transactions: QuorumTxn[];
}

interface IProps {
  config: QuorumConfig;
}

export default function Explorer({ config }: IProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const controller = new AbortController();
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [explorer, setExplorer] = useState<IState>({
    selectedNode: config.nodes[0].name,
    blocks: [],
    transactions: [],
  });
  const [lookBackBlocks, setLookBackBlocks] = useState(10);
  const [isPaused, setIsPaused] = useState(false);

  const onSelectChange = (e: any) => {
    e.preventDefault();
    setLookBackBlocks(e.target.value);
  };

  // use useCallBack
  const nodeInfoHandler = useCallback(
    async (name: string) => {
      if (isPaused === true) {
        return;
      }
      const needle: QuorumNode = getDetailsByNodeName(config, name);
      axios({
        method: "POST",
        url: `/api/blockGetByNumber`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          rpcUrl: needle.rpcUrl,
          blockNumber: "latest",
        }),
        signal: controller.signal,
        timeout: 1000,
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((res) => {
          const quorumBlock: QuorumBlock = res.data as QuorumBlock;
          const currentBlock = parseInt(quorumBlock.number, 16);
          const lastXBlockArray = range(
            currentBlock,
            currentBlock - lookBackBlocks,
            -1
          );
          const returns = lastXBlockArray.map(async (block) => {
            const res = await axios({
              method: "POST",
              url: `/api/blockGetByNumber`,
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify({
                rpcUrl: needle.rpcUrl,
                blockNumber: "0x" + block.toString(16),
              }),
              signal: controller.signal,
              baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
              // timeout: 2000,
            });
            return res.data;
          });
          Promise.all(returns).then((values: QuorumBlock[]) => {
            const slicedBlocks = values.slice(0, 4);
            const slicedTxns = values
              .filter((a) => a.transactions.length > 0)
              .map((a) => a.transactions)
              .flat();
            console.log(slicedBlocks);
            setExplorer({
              selectedNode: name,
              blocks: slicedBlocks,
              transactions: slicedTxns,
            });
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config, lookBackBlocks, isPaused]
  );

  useEffect(() => {
    nodeInfoHandler(explorer.selectedNode);
    intervalRef.current = setInterval(() => {
      if (isPaused !== true) {
        nodeInfoHandler(explorer.selectedNode);
        console.log("explorer > called for new info...");
      }
    }, refresh5s);

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explorer.selectedNode, lookBackBlocks, isPaused]);

  const handleSelectNode = (e: any) => {
    controller.abort();
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setExplorer({ ...explorer, selectedNode: e.target.value });
  };
  if (typeof window !== "undefined" && loading) return null;
  if (!session && publicRuntimeConfig.DISABLE_AUTH === "false") {
    return <AccessDenied />;
  }
  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }} p={0}>
        <PageHeader
          title="Explorer"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <ExplorerBlocks
          blocks={explorer.blocks}
          url={getDetailsByNodeName(config, explorer.selectedNode).rpcUrl}
          onSelectChange={onSelectChange}
          setIsPaused={setIsPaused}
        />
        <Divider />
        <ExplorerTxns
          txns={explorer.transactions}
          url={getDetailsByNodeName(config, explorer.selectedNode).rpcUrl}
        />
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
