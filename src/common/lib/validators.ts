import { ConsensusAlgorithms, Clients } from "../types/Validator";
import { ethApiCall } from "./ethApiCall";

export async function getCurrentValidators(
  rpcUrl: string,
  client: string,
  algorithm: string
) {
  const methodDict: Clients = {
    goquorum: {
      qbft: "istanbul_getValidators",
      ibft: "istanbul_getValidators",
      raft: "", // No pending should go through basically instantly
    },
    besu: {
      qbft: "qbft_getValidatorsByBlockNumber",
      ibft: "ibft_getValidatorsByBlockNumber",
      clique: "clique_getSigners",
    },
  };

  try {
    const req = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!,
      ["latest"]
    );
    const listOfValidators = req.data.result;
    return listOfValidators;
  } catch (err) {
    console.log(err);
  }
}

export async function getPendingVotes(
  rpcUrl: string,
  client: string,
  algorithm: string
) {
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
  const listReturn: any = [];
  try {
    const req = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!
    );
    const listOfCandidates = req.data.result;
    if (Object.keys(listOfCandidates).length !== 0) {
      Object.entries(listOfCandidates).map((values) => listReturn.push(values));
    }
    return listReturn;
  } catch (e) {
    console.log(e);
    return [];
  }
}

