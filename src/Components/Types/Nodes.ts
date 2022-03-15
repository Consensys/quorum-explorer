
import { ReactElement } from "react";

export type QuorumStatCard = {
    label: string,
    value: string | number,
    icon: ReactElement,
}

export type QuorumRouteNode = {
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
};

export const emptyQRNode : QuorumRouteNode = {
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