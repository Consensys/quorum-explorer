import { useState, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import NodeOverview from "../Nodes/NodeOverview";
import NodeDetails from "../Nodes/NodeDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faCubes,
  faUsers,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { QuorumStatCard } from "../Types/Nodes";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { getDetailsByNodeName, getNodeKeys } from "../API/QuorumConfig";
import { updateNodeInfo } from "../API/Nodes";

interface IProps {
  config: QuorumConfig;
}
export default function Nodes ({ config }: IProps ) {
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);
  const [client, setClient] = useState(config.nodes[0].client);
  const [nodeId, setNodeId] = useState("");
  const [nodeName, setNodeName] = useState("");
  const [enode, setEnode] = useState("");
  const [ip, setIp] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");
  const [statusText, setStatusText] = useState("error");
  const [blocks, setBlocks] = useState(0);
  const [peers, setPeers] = useState(0);
  const [queuedTxns, setQueuedTxns] = useState(0);
  const [pendingTxns, setPendingTxns] = useState(0);
  const stats: QuorumStatCard[] = [
    {
      label: "Status",
      value: statusText === "OK" ? "Running" : "Stopped",
      icon:
        statusText === "OK" ? (
          <FontAwesomeIcon icon={faPlay} size="2x" color="green" />
        ) : (
          <FontAwesomeIcon icon={faStop} size="2x" color="red" />
        ),
    },
    {
      label: "Blocks",
      value: blocks,
      icon: <FontAwesomeIcon icon={faCubes} size="2x" color="steelBlue" />,
    },
    {
      label: "Peers",
      value: peers,
      icon: <FontAwesomeIcon icon={faUsers} size="2x" color="dimGray" />,
    },
    {
      label: "Queued",
      value: queuedTxns,
      icon: <FontAwesomeIcon icon={faExchangeAlt} size="2x" color="coral" />,
    },
  ];


  const nodeInfoHandler = async (node: string) => {
    const needle: QuorumNode = getDetailsByNodeName(config, node);
    const rpcUrl: string = needle.rpcUrl;
    const res = await updateNodeInfo(rpcUrl);
    // console.log(res);
    // setSelectedNode(node);
    setClient(needle.client);
    setNodeId(res.nodeId);
    setNodeName(res.nodeName);
    setEnode(res.enode);
    setStatusText(res.statusText);
    setIp(res.ip);
    setRpcUrl(rpcUrl);
    setBlocks(res.blocks);
    setPeers(res.peers,);
  }

  useEffect(() => {
    console.log("component rendered to screen");
    const interval = setInterval(() => {
      console.log("yoohoo " + selectedNode)
      nodeInfoHandler(selectedNode);
    }, 2000);

    // return () => clearInterval(interval);
  }, []);


  const handleSelectNode = (e: any) => {
    console.log("!!!!!!evt")
    console.log(e);
    console.log("!!!!!!evt")
    setSelectedNode(e.target.value);
    console.log(">>>>>>")
    console.log(selectedNode)
    console.log(">>>>>>")
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Nodes"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <NodeOverview stats={stats} statusText={statusText} />
        <NodeDetails
          client={client}
          nodeId={nodeId}
          nodeName={nodeName}
          enode={enode}
          rpcUrl={rpcUrl}
          ip={ip}
          statusText={statusText}
        />
      </Container>
    </>
  );
}

