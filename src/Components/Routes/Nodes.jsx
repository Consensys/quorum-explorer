import { useState, useEffect, useCallback } from "react";
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
import { getDetailsByNodeName } from "../API/QuorumConfig";
import { updateNodeInfo } from "../API/Nodes";

const emptyQRNode = {
  client: "",
  nodeId: "",
  nodeName: "",
  enode: "",
  ip: "",
  statusText: "",
  rpcUrl: "",
  blocks: 0,
  peers: 0,
  pendingTxns: 0,
  queuedTxns: 0,
};

export default function Nodes({ config }) {
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);
  const [qrNode, setQRNode] = useState(emptyQRNode);
  const stats = [
    {
      label: "Status",
      value: qrNode.statusText === "OK" ? "Running" : "Stopped",
      icon:
        qrNode.statusText === "OK" ? (
          <FontAwesomeIcon icon={faPlay} size="2x" color="green" />
        ) : (
          <FontAwesomeIcon icon={faStop} size="2x" color="red" />
        ),
    },
    {
      label: "Blocks",
      value: qrNode.blocks,
      icon: <FontAwesomeIcon icon={faCubes} size="2x" color="steelBlue" />,
    },
    {
      label: "Peers",
      value: qrNode.peers,
      icon: <FontAwesomeIcon icon={faUsers} size="2x" color="dimGray" />,
    },
    {
      label: "Queued",
      value: qrNode.queuedTxns,
      icon: <FontAwesomeIcon icon={faExchangeAlt} size="2x" color="coral" />,
    },
  ];

  // use useCallBack
  // useEffect is go to re-render and causes a memory leek issue - every time react renders Nodes its re-create the api call, you can prevent this case by using useCallBack,
  const nodeInfoHandler = useCallback(async (node) => {
    const needle = getDetailsByNodeName(config, node);
    const rpcUrl = needle.rpcUrl;
    const res = await updateNodeInfo(rpcUrl);
    setQRNode({
      client: needle.client,
      nodeId: res.nodeId,
      nodeName: res.nodeName,
      enode: res.enode,
      ip: res.ip,
      statusText: res.statusText,
      rpcUrl: rpcUrl,
      blocks: res.blocks,
      peers: res.peers,
      pendingTxns: res.pendingTxns,
      queuedTxns: res.queuedTxns,
    });
  }, []);

  useEffect(() => {
    console.log("component rendered to screen");
    nodeInfoHandler(selectedNode);
    const interval = setInterval(() => {
      nodeInfoHandler(selectedNode);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedNode]);

  const handleSelectNode = (e) => {
    setSelectedNode(e.target.value);
    // console.log(selectedNode);
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Nodes"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <NodeOverview stats={stats} statusText={qrNode.statusText} />
        <NodeDetails
          client={qrNode.client}
          nodeId={qrNode.nodeId}
          nodeName={qrNode.nodeName}
          enode={qrNode.enode}
          rpcUrl={qrNode.rpcUrl}
          ip={qrNode.ip}
          statusText={qrNode.statusText}
        />
      </Container>
    </>
  );
}
