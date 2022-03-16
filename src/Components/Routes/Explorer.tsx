
import { useState, useEffect, useCallback } from "react";
import { Container, Divider } from "@chakra-ui/react";
import ExplorerBlocks from "../Explorer/ExplorerBlocks";
import PageHeader from "../Misc/PageHeader";
import { QuorumBlock, QuorumTxn } from "../Types/Explorer";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { QRExplorer, emptyQRExplorer } from "../Types/Routes";
import { getDetailsByNodeName, getNodeKeys } from "../API/QuorumConfig";
import { getBlockByNumber, updateBlockArray, updateTxnArray } from "../API/Explorer";
import ExplorerTxns from "../Explorer/ExplorerTxns";

interface IProps {
  config: QuorumConfig;
}

export default function Explorer ({ config }: IProps ) {

  const [qrExplorer, setQRExplorer] = useState<QRExplorer>( emptyQRExplorer );
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);
  const nodeKeys: string[] = getNodeKeys(config);


  // use useCallBack
  // useEffect is go to re-render and causes a memory leek issue - every time react renders Nodes its re-create the api call, you can prevent this case by using useCallBack,
  const nodeInfoHandler = useCallback(
    async (name: string) => {
      const needle: QuorumNode = getDetailsByNodeName(config, name);
      const rpcUrl: string = needle.rpcUrl;
      const quorumBlock = await getBlockByNumber(rpcUrl, "latest");
      var tmpTxns: QuorumTxn[] = qrExplorer.transactions;
      if (quorumBlock.transactions.length > 0) {
        tmpTxns = updateTxnArray(
          qrExplorer.transactions,
          quorumBlock.transactions,
          4
        );
      }
      var tmpBlocks: QuorumBlock[] = updateBlockArray(qrExplorer.blocks, quorumBlock, 4);
      // setSelectedNode(name);
      setQRExplorer({
        blocks: tmpBlocks,
        transactions: tmpTxns
      });
    },
    [config]
  );

  useEffect(() => {
    console.log("component rendered to screen");
    nodeInfoHandler(selectedNode);
    const interval = setInterval(() => {
      nodeInfoHandler(selectedNode);
    }, 5000);

    return () => clearInterval(interval);
  }, [nodeInfoHandler, config, selectedNode]);


  const handleSelectNode = (e: any) => {
    setSelectedNode(e.target.value);
    // console.log(selectedNode);
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
          blocks={qrExplorer.blocks}
          url={
            getDetailsByNodeName(config, selectedNode)
              .rpcUrl
          }
        />
        <Divider />
        <ExplorerTxns
          txns={qrExplorer.transactions}
          url={
            getDetailsByNodeName(config, selectedNode)
              .rpcUrl
          }
        />
      </Container>
    </>
  );
}



