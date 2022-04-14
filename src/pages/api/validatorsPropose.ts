import type { NextApiRequest, NextApiResponse } from "next";
import { ethApiCall } from "../../common/lib/ethApiCall";
import { ConsensusAlgorithms, Clients } from "../../common/types/Validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const client = req.body.client; 
  const algorithm = req.body.algorithm;
  const rpcUrl = req.body.rpcUrl;
  const address = req.body.address;
  const vote = req.body.vote;
  const methodDict: Clients = {
    goquorum: {
      qbft: "istanbul_propose",
      ibft: "istanbul_propose",
      raft: "raft_addPeer",
    },
    besu: {
      clique: "clique_proposals",
      ibft: "ibft_proposeValidatorVote",
      qbft: "qbft_proposeValidatorVote",
    },
  };
  try {
    const res = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!,
      [address, vote]
    );
    console.log(res);
  } catch (e) {
    console.error(e);
    console.error("Node is unreachable. Ensure ports are open and client is running!" );
    res.status(500).json({});
  } finally {
    res.status(200).json({});
  }
}
