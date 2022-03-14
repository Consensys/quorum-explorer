import axios from "axios";
import { ethApiCall } from "./Common";
import { getBlockByNumber } from "./Explorer";

export async function getCurrentValidators(url: string, consensus: string) {
  // if (!(consensus in ["qbft", "clique", "raft", "ibft"])) {
  //   console.log(
  //     "Provided consensus algorithm is out of range. Choose between 'qbft', 'clique', 'raft', or 'ibft'."
  //   );
  // }
  const methodDict = {
    qbft: "qbft_getValidatorsByBlockNumber",
    ibft: "istanbul_getValidators",
    raft: "raft_leader",
    clique: "clique_getSigners",
  };
  const minersList: string[] = [];
  const numBlocksPrev = 20;
  const latestBlock = await getBlockByNumber(url, "latest");
  const transformLatestBlock = parseInt(latestBlock.number.toString(), 16);


  for (let i = 0; i < numBlocksPrev; i++) {
    const wtf = '0x' + (transformLatestBlock - i).toString(16)
    const responseBlock = await getBlockByNumber(url, wtf);
    minersList.push(responseBlock.miner);
  }
  const uniqueList = [new Set(minersList)];
  return uniqueList;
  // if (consensus === "qbft") {
  // Get current block height, axios batch call current block-height minus 20 to get last 20 blocks
  // Loop through response.miner and append to minersList and remove duplicates
  // const uniqueList = [...new Set(minersList)]

  // } else if (consensus === "ibft") {
  // } else if (consensus === "clique") {
  // } else if (consensus === "raft") {
  // }
}

export async function getPendingVotes(url: string, consensus: string) {
  if (!(consensus in ["qbft", "clique", "raft", "ibft"])) {
    console.log(
      "Provided consensus algorithm is out of range. Choose between 'qbft', 'clique', 'raft', or 'ibft'."
    );
  }
  const methodDict = {
    qbft: "qbft_getPendingVotes",
    ibft: "ibft_getPendingVotes",
    raft: "",
    clique: "clique_proposals",
  };
}

export async function proposeValidator(url: string, consensus: string) {
  if (!(consensus in ["qbft", "clique", "raft", "ibft"])) {
    console.log(
      "Provided consensus algorithm is out of range. Choose between 'qbft', 'clique', 'raft', or 'ibft'."
    );
  }
  const methodDict = {
    qbft: "qbft_proposeValidatorVote",
    ibft: "ibft_proposeValidatorVote",
    raft: "raft_addPeer",
    clique: "clique_proposals",
  };
}
