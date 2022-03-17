import { useState, useEffect, useCallback, useRef } from "react";
import { Container, Divider } from "@chakra-ui/react";
import ExplorerBlocks from "../Explorer/ExplorerBlocks";
import PageHeader from "../Misc/PageHeader";
import { getDetailsByNodeName } from "../API/QuorumConfig";
import {
  getBlockByNumber,
  updateBlockArray,
  updateTxnArray,
} from "../API/Explorer";
import ExplorerTxns from "../Explorer/ExplorerTxns";

export default function Explorer({ config }) {
  const intervalRef = useRef(null);
  const [qrExplorer, setQRExplorer] = useState({
    blocks: [],
    transactions: [],
  });
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);

  // use useCallBack
  // useEffect is go to re-render and causes a memory leek issue - every time react renders Nodes its re-create the api call, you can prevent this case by using useCallBack,
  const nodeInfoHandler = useCallback(async (name) => {
    const needle = getDetailsByNodeName(config, name);
    const rpcUrl = needle.rpcUrl;
    const quorumBlock = await getBlockByNumber(rpcUrl, "latest");
    let tmpTxns = qrExplorer.transactions;
    if (quorumBlock.transactions.length > 0) {
      tmpTxns = updateTxnArray(
        qrExplorer.transactions,
        quorumBlock.transactions,
        4
      );
    }
    let tmpBlocks = updateBlockArray(qrExplorer.blocks, quorumBlock, 4);
    // setSelectedNode(name);
    setQRExplorer({
      blocks: tmpBlocks,
      transactions: tmpTxns,
    });
  }, []);

  useEffect(() => {
    console.log("component rendered to screen");
    nodeInfoHandler(selectedNode);
    intervalRef.current = setInterval(() => {
      console.log("calling for blocks...");
      nodeInfoHandler(selectedNode);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [selectedNode]);

  const handleSelectNode = (e) => {
    clearInterval(intervalRef.current);
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
          url={getDetailsByNodeName(config, selectedNode).rpcUrl}
        />
        <Divider />
        <ExplorerTxns
          txns={qrExplorer.transactions}
          url={getDetailsByNodeName(config, selectedNode).rpcUrl}
        />
      </Container>
    </>
  );
}
