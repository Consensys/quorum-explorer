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

export async function getPendingVotes(config: QuorumConfig) {
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
  config.nodes.map(async (node) => {
    if (node.client === "goquorum") {
      if (config.algorithm === "qbft" || config.algorithm === "ibft") {
        const req = await ethApiCall(node.rpcUrl, methodDict.goquorum.qbft);
        const listOfCandidates = req.data.result;
        if (Object.keys(listOfCandidates).length !== 0) {
          listReturn.push(Object.keys(listOfCandidates)[0]);
        }
      }
    } else if (node.client === "besu") {
      if (config.algorithm === "qbft") {
        const req = await ethApiCall(node.rpcUrl, methodDict.besu.qbft);
        const listOfCandidates = req.data.result;
        if (Object.keys(listOfCandidates).length !== 0) {
          listReturn.push(Object.keys(listOfCandidates)[0]);
        }
      } else if (config.algorithm === "ibft") {
        const req = await ethApiCall(node.rpcUrl, methodDict.besu.ibft);
        const listOfCandidates = req.data.result;
        if (Object.keys(listOfCandidates).length !== 0) {
          listReturn.push(Object.keys(listOfCandidates)[0]);
        }
      } else if (config.algorithm === "clique") {
        const req = await ethApiCall(node.rpcUrl, methodDict.besu.clique);
        const listOfCandidates = req.data.result;
        if (Object.keys(listOfCandidates).length !== 0) {
          listReturn.push(Object.keys(listOfCandidates)[0]);
        }
      }
    }
  });
  return listReturn;
}

export async function proposeValidator(url: string, consensus: string) {
  const methodDict = {
    qbft: "qbft_proposeValidatorVote",
    ibft: "ibft_proposeValidatorVote",
    raft: "raft_addPeer",
    clique: "clique_proposals",
  };
}

export async function discardProposal(url: string, consensus: string) {
  const methodDict = {
    qbft: "qbft_discardValidatorVote", // istanbul_discard
    ibft: "ibft_discardValidatorVote", // istanbul_discard
    raft: "raft_removePeer",
    clique: "clique_discard",
  };
}
