import { QuorumConfig } from "./../Types/QuorumConfig";
import { ethApiCall } from "./Common";
import { getBlockByNumber } from "./Explorer";

export async function getCurrentValidators(url: string) {
  const minersList: string[] = [];
  let numBlocksPrev = 20;
  const latestBlock = await getBlockByNumber(url, "latest");
  if (latestBlock.number < 20) {
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

export async function getPendingVotes(
  rpcUrl: string,
  client: string,
  algorithm: string
) {
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
  const listReturn: any = [];

  if (client === "goquorum") {
    if (algorithm === "qbft" || algorithm === "ibft") {
      const req = await ethApiCall(rpcUrl, methodDict.goquorum[algorithm]);
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
  rpcUrl: string,
  client: string,
  algorithm: string,
  address: string
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
        true,
      ]);
      console.log(req);
      const status = req.status;
      return status;
    }
  }
}

export async function discardProposal(
  rpcUrl: string,
  client: string,
  algorithm: string,
  address: string
) {
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
      const req = await ethApiCall(rpcUrl, methodDict.goquorum[algorithm], [
        address,
      ]);
      // console.log(req);
      const status = req.status;
      return status;
    }
  }
}
