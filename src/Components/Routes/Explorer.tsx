import { useState, useEffect, useCallback, useRef } from "react";
import { Container, Divider } from "@chakra-ui/react";
import ExplorerBlocks from "../Explorer/ExplorerBlocks";
import ExplorerTxns from "../Explorer/ExplorerTxns";
import PageHeader from "../Misc/PageHeader";
import { QuorumBlock, QuorumTxn } from "../Types/Explorer";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { getDetailsByNodeName } from "../../API/QuorumConfig";
import {
  getBlockByNumber,
  updateBlockArray,
  updateTxnArray,
} from "../../API/Explorer";

interface IProps {
  config: QuorumConfig;
}

interface IState {
  selectedNode: string;
  blocks: QuorumBlock[];
  transactions: QuorumTxn[];
}

export default function Explorer(props: IProps) {
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshFrequency: number = 5000;
  const [explorer, setExplorer] = useState<IState>({
    selectedNode: props.config.nodes[0].name,
    blocks: [],
    transactions: [],
  });

  // use useCallBack
  // useEffect is go to re-render and causes a memory leek issue - every time react renders Nodes its re-create the api call, you can prevent this case by using useCallBack,
  const nodeInfoHandler = useCallback(
    async (name: string) => {
      const needle: QuorumNode = getDetailsByNodeName(props.config, name);
      const rpcUrl: string = needle.rpcUrl;
      const quorumBlock = await getBlockByNumber(rpcUrl, "latest");
      var tmpTxns: QuorumTxn[] = explorer.transactions;
      if (quorumBlock.transactions.length > 0) {
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
    [props.config]
  );

  useEffect(() => {
    console.log("component rendered to screen");
    nodeInfoHandler(explorer.selectedNode);
    intervalRef.current = setInterval(() => {
      nodeInfoHandler(explorer.selectedNode);
    }, refreshFrequency);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [explorer.selectedNode]);

  const handleSelectNode = (e: any) => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setExplorer({ ...explorer, selectedNode: e.target.value });
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }} p={0}>
        <PageHeader
          title="Explorer"
          config={props.config}
          selectNodeHandler={handleSelectNode}
        />
        <ExplorerBlocks
          blocks={explorer.blocks}
          url={getDetailsByNodeName(props.config, explorer.selectedNode).rpcUrl}
        />
        <Divider />
        <ExplorerTxns
          txns={explorer.transactions}
          url={getDetailsByNodeName(props.config, explorer.selectedNode).rpcUrl}
        />
      </Container>
    </>
  );
}
