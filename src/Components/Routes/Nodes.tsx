import { useState, useEffect, useCallback } from "react";
import { Container } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import NodeOverview from "../Nodes/NodeOverview";
import NodeDetails from "../Nodes/NodeDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faCubes, faUsers, faExchangeAlt, } from "@fortawesome/free-solid-svg-icons";
import { QuorumStatCard } from "../Types/Nodes";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";
import { QRNode, emptyQRNode } from "../Types/Routes";
import { getDetailsByNodeName } from "../API/QuorumConfig";
import { updateNodeInfo } from "../API/Nodes";

interface IProps {
  config: QuorumConfig;
}

export default function Nodes({ config }: IProps) {
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);
  const [qrNode, setQRNode] = useState<QRNode>( emptyQRNode );
  const stats: QuorumStatCard[] = [
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
  const nodeInfoHandler = useCallback(
    async (node: string) => {
      const needle: QuorumNode = getDetailsByNodeName(config, node);
      const rpcUrl: string = needle.rpcUrl;
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
