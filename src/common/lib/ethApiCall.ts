import axios from "axios";
import { configReader } from "../../common/lib/getConfig";
import { QuorumNode } from "../types/QuorumConfig";

const allowedMethods = [
  "eth_getBlockByNumber",
  "admin_nodeInfo",
  "eth_blockNumber",
  "net_peerCount",
  "txpool_besuTransactions",
  "txpool_status",
  "eth_getTransactionByHash",
  "istanbul_discard",
  "raft_removePeer",
  "qbft_discardValidatorVote",
  "ibft_discardValidatorVote",
  "clique_discard",
  "istanbul_getValidators",
  "qbft_getValidatorsByBlockNumber",
  "ibft_getValidatorsByBlockNumber",
  "clique_getSigners",
  "istanbul_candidates",
  "qbft_getPendingVotes",
  "ibft_getPendingVotes",
  "clique_proposals",
  "istanbul_propose",
  "raft_addPeer",
  "clique_proposals",
  "ibft_proposeValidatorVote",
  "qbft_proposeValidatorVote",
  "eth_getBalance",
  "admin_peers",
];

export async function ethApiCall(
  url: string,
  method: string,
  params: any[] = []
) {
  // Verify that url and methods cannot be subject to a server-side request forgery
  const getConf = JSON.parse(await configReader());
  const rpcList = getConf.nodes.map((x: QuorumNode) => {
    return x.rpcUrl;
  });
  if (!rpcList.includes(url) || !allowedMethods.includes(method)) {
    throw "URL or method is not allowed";
  }
  return axios({
    method: "post",
    url: url,
    data: {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    },
    headers: { "Content-Type": "application/json" },
    timeout: 2000,
  });
}
