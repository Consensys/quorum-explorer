import { QuorumConfig } from "../types/QuorumConfig";

export function getNodeKeys(quorumConfig: QuorumConfig) {
  return quorumConfig.nodes.map((_) => _.name);
}

export function getDetailsByNodeName(quorumConfig: QuorumConfig, node: string) {
  return quorumConfig.nodes.filter((_) => _.name === node)[0];
}

export function getPrivateKey(
  quorumConfig: QuorumConfig,
  accountAddress: string
) {
  return quorumConfig.accounts.filter((_) => _.address === accountAddress)[0];
}
