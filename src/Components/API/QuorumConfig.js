export function getNodeKeys(quorumConfig) {
  return quorumConfig.nodes.map((_) => _.name);
}

export function getDetailsByNodeName(quorumConfig, node) {
  return quorumConfig.nodes.filter((_) => _.name === node)[0];
}
