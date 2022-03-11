
export type QuorumBlock = {
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
    