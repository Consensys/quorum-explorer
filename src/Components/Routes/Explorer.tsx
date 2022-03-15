
import { useState, useEffect } from "react";
import { Container, Divider } from "@chakra-ui/react";
import ExplorerBlocks from "../Explorer/ExplorerBlocks";
import PageHeader from "../Misc/PageHeader";
import { QuorumBlock, QuorumTxn } from "../Types/Explorer";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { getDetailsByNodeName, getNodeKeys } from "../API/QuorumConfig";
import { getBlockByNumber, updateBlockArray, updateTxnArray } from "../API/Explorer";
import ExplorerTxns from "../Explorer/ExplorerTxns";

interface IProps {
  config: QuorumConfig;
}

export default function Explorer ({ config }: IProps ) {

  const [blockNumber, setBlockNumber] = useState(0);
  const [transactions, setTransactions] = useState<QuorumTxn[]>([]);
  const [blocks, setBlocks] = useState<QuorumBlock[]>([]);
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);
  const nodeKeys: string[] = getNodeKeys(config);

  const nodeInfoHandler = async (name: string) => {
    const needle: QuorumNode = getDetailsByNodeName(config, name);
    const rpcUrl: string = needle.rpcUrl;
    const quorumBlock = await getBlockByNumber(rpcUrl, "latest");
    var tmpTxns: QuorumTxn[] = transactions;
    if (quorumBlock.transactions.length > 0) {
      tmpTxns = updateTxnArray(
        transactions,
        quorumBlock.transactions,
        4
      );
    }
    var tmpBlocks: QuorumBlock[] = updateBlockArray(blocks, quorumBlock, 4);
    setSelectedNode(name);
    setBlockNumber(quorumBlock.number);
    setBlocks(tmpBlocks);
    setTransactions(tmpTxns);
  }

  useEffect(() => {
    console.log("component rendered to screen");
    const interval = setInterval(() => {
      nodeInfoHandler(selectedNode);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectNode = (e: any) => {
    console.log(e);
    setSelectedNode(e.target.value);
    //nodeInfoHandler(e);
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
          blocks={blocks}
          url={
            getDetailsByNodeName(config, selectedNode)
              .rpcUrl
          }
        />
        <Divider />
        <ExplorerTxns
          txns={transactions}
          url={
            getDetailsByNodeName(config, selectedNode)
              .rpcUrl
          }
        />
      </Container>
    </>
  );
}



