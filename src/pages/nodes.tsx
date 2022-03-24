import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@chakra-ui/react";
import PageHeader from "../common/components/Misc/PageHeader";
import NodeOverview from "../common/components/Nodes/NodeOverview";
import NodeDetails from "../common/components/Nodes/NodeDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStop,
  faCubes,
  faUsers,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { QuorumStatCard } from "../common/types/Nodes";
import { QuorumConfig, QuorumNode } from "../common/types/QuorumConfig";
import { getDetailsByNodeName } from "../common/api/quorumConfig";
import { updateNodeInfo } from "../common/api/nodes";

const config: QuorumConfig = require("../config/config.json");

interface IState {
  selectedNode: string;
  client: string;
  nodeId: string;
  nodeName: string;
  enode: string;
  ip: string;
  statusText: string;
  rpcUrl: string;
  blocks: number;
  peers: number;
  queuedTxns: number;
  pendingTxns: number;
}

export default function Nodes() {
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshFrequency: number = 5000;
  const [node, setNode] = useState<IState>({
    selectedNode: config.nodes[0].name,
    client: "",
    nodeId: "",
    nodeName: "",
    enode: "",
    ip: "",
    statusText: "error",
    rpcUrl: "",
    blocks: 0,
    peers: 0,
    queuedTxns: 0,
    pendingTxns: 0,
  });

  const stats: QuorumStatCard[] = [
    {
      label: "Status",
      value: node.statusText === "OK" ? "Running" : "Stopped",
      icon:
        node.statusText === "OK" ? (
          <FontAwesomeIcon icon={faPlay as IconProp} size="2x" color="green" />
        ) : (
          <FontAwesomeIcon icon={faStop as IconProp} size="2x" color="red" />
        ),
    },
    {
      label: "Blocks",
      value: node.blocks,
      icon: (
        <FontAwesomeIcon
          icon={faCubes as IconProp}
          size="2x"
          color="steelBlue"
        />
      ),
    },
    {
      label: "Peers",
      value: node.peers,
      icon: (
        <FontAwesomeIcon icon={faUsers as IconProp} size="2x" color="dimGray" />
      ),
    },
    {
      label: "Queued",
      value: node.queuedTxns,
      icon: (
        <FontAwesomeIcon
          icon={faExchangeAlt as IconProp}
          size="2x"
          color="coral"
        />
      ),
    },
  ];

  // use useCallBack
  // useEffect is go to re-render and causes a memory leek issue - every time react renders Nodes its re-create the api call, you can prevent this case by using useCallBack,
  const nodeInfoHandler = useCallback(
    async (name: string) => {
      const needle: QuorumNode = getDetailsByNodeName(config, name);
      const rpcUrl: string = needle.rpcUrl;
      const res = await updateNodeInfo(rpcUrl);
      setNode({
        selectedNode: name,
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
    nodeInfoHandler(node.selectedNode);
    intervalRef.current = setInterval(() => {
      nodeInfoHandler(node.selectedNode);
    }, refreshFrequency);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.selectedNode]);

  const handleSelectNode = (e: any) => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setNode({ ...node, selectedNode: e.target.value });
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Nodes"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
        <NodeOverview stats={stats} statusText={node.statusText} />
        <NodeDetails
          client={node.client}
          nodeId={node.nodeId}
          nodeName={node.nodeName}
          enode={node.enode}
          rpcUrl={node.rpcUrl}
          ip={node.ip}
          statusText={node.statusText}
        />
      </Container>
    </>
  );
}