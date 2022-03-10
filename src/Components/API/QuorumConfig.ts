import { QuorumConfig } from "../Types/QuorumConfig"

export function getNodeKeys(quorumConfig: QuorumConfig) {
    return quorumConfig.nodes.map(_=>_.name)
}

export function getDetailsByNodeName(quorumConfig: QuorumConfig, node: string) {
    return quorumConfig.nodes.filter(_=>_.name === node)[0]
}