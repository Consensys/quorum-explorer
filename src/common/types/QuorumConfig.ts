export type QuorumNode = {
  name: string;
  client: string;
  rpcUrl: string;
  privateTxUrl: string;
  privateKey: string;
  accountAddress: string;
};

export type QuorumAccount = {
  address: string;
  privateKey: string;
  comment?: string;
};

export type QuorumConfig = {
  algorithm: string;
  nodes: QuorumNode[];
  accounts: QuorumAccount[];
};
