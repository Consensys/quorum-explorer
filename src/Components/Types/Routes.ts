import { QuorumBlock, QuorumTxn } from "./Explorer";

export type QRNode = {
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
  
  export const emptyQRNode : QRNode = {
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


export type QRExplorer = {
  blocks: QuorumBlock[];
  transactions: QuorumTxn[];
};

export const emptyQRExplorer : QRExplorer = {
  blocks: [],
  transactions: []
};