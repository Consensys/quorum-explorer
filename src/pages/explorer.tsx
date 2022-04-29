import { useState, useEffect, useCallback, useRef } from "react";
import { Container, Divider } from "@chakra-ui/react";
import ExplorerBlocks from "../common/components/Explorer/ExplorerBlocks";
import ExplorerTxns from "../common/components/Explorer/ExplorerTxns";
import PageHeader from "../common/components/Misc/PageHeader";
import { QuorumBlock, QuorumTxn } from "../common/types/Explorer";
import { QuorumConfig, QuorumNode } from "../common/types/QuorumConfig";
import { getDetailsByNodeName } from "../common/lib/quorumConfig";
import { refresh5s } from "../common/lib/common";
import { updateBlockArray, updateTxnArray } from "../common/lib/explorer";
import { configReader } from "../common/lib/getConfig";

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
  const controller = new AbortController();
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [explorer, setExplorer] = useState<IState>({
    selectedNode: config.nodes[0].name,
    blocks: [],
    transactions: [],
  });

  // use useCallBack
  // useEffect is go to re-render and causes a memory leek issue - every time react renders Nodes its re-create the api call, you can prevent this case by using useCallBack,
  const nodeInfoHandler = useCallback(
    async (name: string) => {
      const needle: QuorumNode = getDetailsByNodeName(config, name);
      const res = await axios({
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
        baseURL: `${process.env.NEXT_PUBLIC_QE_BASEPATH}`,
      });
      var quorumBlock: QuorumBlock = res.data as QuorumBlock;
      var tmpTxns: QuorumTxn[] = explorer.transactions;
      if (res.data.transactions.length > 0) {
        tmpTxns = updateTxnArray(
          explorer.transactions,
          quorumBlock.transactions,
          4
        );
      }
      var tmpBlocks: QuorumBlock[] = updateBlockArray(
        explorer.blocks,
        quorumBlock,
        4
      );
      setExplorer({
        selectedNode: name,
        blocks: tmpBlocks,
        transactions: tmpTxns,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config]
  );

  useEffect(() => {
    nodeInfoHandler(explorer.selectedNode);
    intervalRef.current = setInterval(() => {
      nodeInfoHandler(explorer.selectedNode);
      console.log("explorer > called for new info...");
    }, refresh5s);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explorer.selectedNode]);

  const handleSelectNode = (e: any) => {
    controller.abort();
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setExplorer({ ...explorer, selectedNode: e.target.value });
  };

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

export async function getServerSideProps() {
  const res = await configReader();
  const config: QuorumConfig = JSON.parse(res);
  return { props: { config } };
}
