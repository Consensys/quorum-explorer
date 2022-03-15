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

export type NodeViewTmp = {
  client: string,
  nodeId: string,
  nodeName: string,
  enode: string,
  ip: string,
  statusText: string,
  rpcUrl: string,
  blocks: number,
  peers: number,
  queuedTxns: number,
  pendingTxns: number,
}

export default function Nodes ({ config }: IProps ) {
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);
  const [nodeViewTmp, setNodeViewTmp] = useState<NodeViewTmp>({client:"",  nodeId:"", nodeName: "", enode: "", ip: "", statusText:"", rpcUrl: "", blocks: 0, peers: 0, pendingTxns: 0, queuedTxns:0 });
  const stats: QuorumStatCard[] = [
    {
      label: "Status",
      value: nodeViewTmp.statusText === "OK" ? "Running" : "Stopped",
      icon:
        nodeViewTmp.statusText === "OK" ? (
          <FontAwesomeIcon icon={faPlay} size="2x" color="green" />
        ) : (
          <FontAwesomeIcon icon={faStop} size="2x" color="red" />
        ),
    },
    {
      label: "Blocks",
      value: nodeViewTmp.blocks,
      icon: <FontAwesomeIcon icon={faCubes} size="2x" color="steelBlue" />,
    },
    {
      label: "Peers",
      value: nodeViewTmp.peers,
      icon: <FontAwesomeIcon icon={faUsers} size="2x" color="dimGray" />,
    },
    {
      label: "Queued",
      value: nodeViewTmp.queuedTxns,
      icon: <FontAwesomeIcon icon={faExchangeAlt} size="2x" color="coral" />,
    },
  ];


  const nodeInfoHandler = async (node: string) => {
    const needle: QuorumNode = getDetailsByNodeName(config, node);
    const rpcUrl: string = needle.rpcUrl;
    const res = await updateNodeInfo(rpcUrl);
    console.log(res);
    // setSelectedNode(node);
    setNodeViewTmp({
      client:needle.client,
      nodeId:res.nodeId,
      nodeName: res.nodeName, 
      enode: res.enode, 
      ip: res.ip, 
      statusText: res.statusText, 
      rpcUrl: rpcUrl, 
      blocks: res.blocks, 
      peers: res.peers, 
      pendingTxns: res.pendingTxns, 
      queuedTxns: res.queuedTxns });
   
  }

  useEffect(() => {
    console.log("component rendered to screen");
    const interval = setInterval(() => {
      console.log("yoohoo " + selectedNode)
      nodeInfoHandler(selectedNode);
    }, 10000);

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
        <NodeOverview stats={stats} statusText={nodeViewTmp.statusText} />
        <NodeDetails
          client={nodeViewTmp.client}
          nodeId={nodeViewTmp.nodeId}
          nodeName={nodeViewTmp.nodeName}
          enode={nodeViewTmp.enode}
          rpcUrl={nodeViewTmp.rpcUrl}
          ip={nodeViewTmp.ip}
          statusText={nodeViewTmp.statusText}
        />
      </Container>
    </>
  );
}

