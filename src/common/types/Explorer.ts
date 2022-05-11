export type QuorumTxn = {
  blockHash: string;
  blockNumber: number;
  from: string;
  gas: number;
  gasPrice: number;
  hash: string;
  input: string;
  nonce: number;
  to?: any;
  transactionIndex: number;
  value: string;
  v: string;
  r: string;
  s: string;
};

export type QuorumBlock = {
  statusText: string;
  number: string;
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
  transactions: QuorumTxn[];
};
