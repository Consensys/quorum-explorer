import type { NextApiRequest, NextApiResponse } from "next";
import apiAuth from "../../common/lib/authentication";
import { ethApiCall } from "../../common/lib/ethApiCall";
import { ConsensusAlgorithms, Clients } from "../../common/types/Validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const client = req.body.client;
  const algorithm = req.body.algorithm;
  const rpcUrl = req.body.rpcUrl;
  let status = { error: 1, validators: [] };
  const pendingVotes: any = [];
  const methodDict: Clients = {
    goquorum: {
      qbft: "istanbul_candidates",
      ibft: "istanbul_candidates",
      raft: "", // No pending should go through basically instantly
    },
    besu: {
      qbft: "qbft_getPendingVotes",
      ibft: "ibft_getPendingVotes",
      clique: "clique_proposals",
    },
  };
  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }
  try {
    const res = await await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!
    );
    const listOfCandidates = res.data.result;
    if (Object.keys(listOfCandidates).length !== 0) {
      Object.entries(listOfCandidates).map((values) =>
        pendingVotes.push(values)
      );
    }
    status = { error: res.status, validators: pendingVotes };
  } catch (e) {
    console.error(e);
    console.error(
      "Node is unreachable. Ensure ports are open and client is running!"
    );
  } finally {
    res.status(200).json(status);
    res.end();
  }
}
