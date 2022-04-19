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
  const methodDict: Clients = {
    goquorum: {
      qbft: "istanbul_discard",
      ibft: "istanbul_discard",
      raft: "raft_removePeer",
    },
    besu: {
      qbft: "qbft_discardValidatorVote",
      ibft: "ibft_discardValidatorVote",
      clique: "clique_discard",
    },
  };
  try {
    const res = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!,
      [address]
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

