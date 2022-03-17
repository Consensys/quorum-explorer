import { ethApiCall } from "./Common";
import { getBlockByNumber } from "./Explorer";

export async function getCurrentValidators(url) {
  const minersList = [];
  let numBlocksPrev = 10;
  const latestBlock = await getBlockByNumber(url, "latest");
  if (latestBlock.number < numBlocksPrev) {
    numBlocksPrev = latestBlock.number;
  }
  const transformLatestBlock = parseInt(latestBlock.number.toString(), 16);

  for (let i = 0; i < numBlocksPrev; i++) {
    const wtf = "0x" + (transformLatestBlock - i).toString(16);
    const responseBlock = await getBlockByNumber(url, wtf);
    minersList.push(responseBlock.miner);
  }
  const uniqueList = [...new Set(minersList)];

  return uniqueList.sort();
}

export async function getPendingVotes(rpcUrl, client, algorithm) {
  const methodDict = {
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
  const listReturn = [];

  if (client === "goquorum") {
    if (algorithm === "qbft" || algorithm === "ibft") {
      const req = await ethApiCall(rpcUrl, methodDict[client][algorithm]);
      const listOfCandidates = req.data.result;
      if (Object.keys(listOfCandidates).length !== 0) {
        Object.keys(listOfCandidates).map((address) =>
          listReturn.push(address)
        );
      }
    }
  }
  return listReturn;
}

export async function proposeValidator(
  rpcUrl,
  client,
  algorithm,
  address,
  vote // true to vote in, false to vote out
) {
  const methodDict = {
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
  if (client === "goquorum") {
    if (algorithm === "qbft" || algorithm === "ibft") {
      const req = await ethApiCall(rpcUrl, methodDict[client][algorithm], [
        address,
        vote,
      ]);
      console.log(req);
      const status = req.status;
      return status;
    }
  }
}

export async function discardProposal(rpcUrl, client, algorithm, address) {
  const methodDict = {
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

  if (client === "goquorum") {
    if (algorithm === "qbft" || algorithm === "ibft") {
      const req = await ethApiCall(rpcUrl, methodDict[client][algorithm], [
        address,
      ]);
      // console.log(req);
      const status = req.status;
      return status;
    }
  }
}