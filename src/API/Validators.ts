import { ConsensusAlgorithms, Clients } from "./../Components/Types/Validator";
import { ethApiCall } from "./Common";
import { getBlockByNumber } from "./Explorer";

export async function getCurrentValidators(url: string) {
  const minersList: string[] = [];
  let numBlocksPrev = 10;
  try {
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
  } catch (e) {
    console.log(e);
    return [];
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

export async function proposeValidator(
  rpcUrl: string,
  client: string,
  algorithm: string,
  address: string,
  vote: boolean // true to vote in, false to vote out
) {
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
    const req = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!,
      [address, vote]
    );
    console.log(req);
    const status = req.status;
    return status;
  } catch (e) {
    console.log(e);
    return 500;
  }
}

export async function discardProposal(
  rpcUrl: string,
  client: string,
  algorithm: string,
  address: string
) {
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
    const req = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!,
      [address]
    );
    // console.log(req);
    const status = req.status;
    return status;
  } catch (e) {
    console.log(e);
    return 500;
  }
}
