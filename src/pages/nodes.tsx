import { useState, useEffect, useCallback, useRef } from "react";
import { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import AccessDenied from "../common/components/Misc/AccessDenied";
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
import { getDetailsByNodeName } from "../common/lib/quorumConfig";
import { refresh5s } from "../common/lib/common";
import axios from "axios";
import NodePeers from "../common/components/Nodes/NodePeers";
import { configReader } from "../common/lib/getConfig";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

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

interface IProps {
  config: QuorumConfig;
}

export default function Nodes({ config }: IProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [node, setNode] = useState<IState>({
    selectedNode: config.nodes[0].name,
    client: config.nodes[0].client,
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
  const [peers, setPeers] = useState([]);

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
      await axios({
        method: "POST",
        url: `/api/nodeGetDetails`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          client: needle.client,
          rpcUrl: needle.rpcUrl,
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((res) => {
          setNode({
            selectedNode: name,
            client: needle.client,
            nodeId: res.data.nodeId,
            nodeName: res.data.nodeName,
            enode: res.data.enode,
            ip: res.data.ip,
            statusText: res.data.statusText,
            rpcUrl: needle.rpcUrl,
            blocks: res.data.blocks,
            peers: res.data.peers,
            pendingTxns: res.data.pendingTxns,
            queuedTxns: res.data.queuedTxns,
          });
        })
        .catch((err) => {
          if ((err.status = 401)) console.error(`${err.status} Unauthorized`);
          setNode({
            selectedNode: name,
            client: needle.client,
            nodeId: "",
            nodeName: "",
            enode: "",
            ip: "",
            statusText: "error",
            rpcUrl: needle.rpcUrl,
            blocks: 0,
            peers: 0,
            pendingTxns: 0,
            queuedTxns: 0,
          });
        });
      await axios({
        method: "POST",
        url: `/api/nodeGetPeers`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          rpcUrl: needle.rpcUrl,
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((res) => {
          setPeers(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config]
  );

  useEffect(() => {
    nodeInfoHandler(node.selectedNode);
    intervalRef.current = setInterval(() => {
      nodeInfoHandler(node.selectedNode);
      console.log("nodes > called for new info...");
    }, refresh5s);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.selectedNode, session]);

  const handleSelectNode = (e: any) => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setNode({ ...node, selectedNode: e.target.value });
  };
  if (typeof window !== "undefined" && loading) return null;
  if (!session && publicRuntimeConfig.DISABLE_AUTH === "false") {
    return <AccessDenied />;
  }
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
        {peers.length > 0 && <NodePeers peers={peers} />}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const res = await configReader();
  const config: QuorumConfig = JSON.parse(res);
  return {
    props: {
      config,
      session: await getSession(context),
    },
  };
};
