import axios from "axios";
import { ethApiCall } from "./Common";
import { getBlockByNumber } from "./Explorer";

export async function getCurrentValidators(url: string, consensus: string) {
  // const methodDict = {
  //   qbft: "qbft_getValidatorsByBlockNumber",
  //   ibft: "istanbul_getValidators",
  //   raft: "raft_leader",
  //   clique: "clique_getSigners",
  // };
  const minersList: string[] = [];
  let numBlocksPrev = 20;
  const latestBlock = await getBlockByNumber(url, "latest");
  if (latestBlock.number < 20) {
    numBlocksPrev = latestBlock.number
  }
  const transformLatestBlock = parseInt(latestBlock.number.toString(), 16);

  for (let i = 0; i < numBlocksPrev; i++) {
    const wtf = '0x' + (transformLatestBlock - i).toString(16)
    const responseBlock = await getBlockByNumber(url, wtf);
    minersList.push(responseBlock.miner);
  }
  const uniqueList = [...new Set(minersList)];

  return uniqueList.sort();

}

export async function getPendingVotes(url: string, consensus: string) {
  const methodDict = {
    qbft: "qbft_getPendingVotes",
    ibft: "ibft_getPendingVotes",
    raft: "",
    clique: "clique_proposals",
  };
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