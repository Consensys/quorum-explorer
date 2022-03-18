export interface consensusAlgorithms {
  qbft: string;
  ibft: string;
  raft?: string;
  clique?: string;
}
export interface clients {
  goquorum: consensusAlgorithms;
  besu: consensusAlgorithms;
}
