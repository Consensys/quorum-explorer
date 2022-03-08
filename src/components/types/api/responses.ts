
export type NodeDetails = {
  statusText: string;
  nodeId: string;
  nodeName: string;
  enode: string;
  ip: string;
  blocks: number;
  peers: number;
  queuedTxns: number;
  pendingTxns: number;
};


  
export type BlockDetails = {
  statusText: string;
  number: number;
  hash: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  extraData: string;
  size: string;
  gasUsed: string;
  gasLimit: string;
  timestamp: string;
  uncles: string[];
  transactions: string[];
};
  
  