export interface ConsensusAlgorithms {
  qbft: string;
  ibft: string;
  raft?: string;
  clique?: string;
}
export interface Clients {
  goquorum: ConsensusAlgorithms;
  besu: ConsensusAlgorithms;
}
