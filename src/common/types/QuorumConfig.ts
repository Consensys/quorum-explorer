
export type QuorumNode = {
  name: string;
  client: string;
  rpcUrl: string;
  wsUrl: string;
};

export type QuorumConfig = {
  algorithm: string;
  nodes: QuorumNode[];
};
