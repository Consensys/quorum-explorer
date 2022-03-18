<<<<<<< HEAD
import { ConsensusAlgorithms, Clients } from "./../Components/Types/Validator";
=======
import { consensusAlgorithms, clients } from "./../Components/Types/Validator";
>>>>>>> 0491b8a (fix explorer transactions ago and validator calls support besu)
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
<<<<<<< HEAD
  const methodDict: Clients = {
=======
  const methodDict: clients = {
>>>>>>> 0491b8a (fix explorer transactions ago and validator calls support besu)
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

<<<<<<< HEAD
  try {
    const req = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!
    );
    const listOfCandidates = req.data.result;
    if (Object.keys(listOfCandidates).length !== 0) {
      Object.keys(listOfCandidates).map((address) => listReturn.push(address));
    }

    return listReturn;
  } catch (e) {
    console.log(e);
    return [];
  }
=======
  const req = await ethApiCall(
    rpcUrl,
    methodDict[client as keyof clients][algorithm as keyof consensusAlgorithms]!
  );
  const listOfCandidates = req.data.result;
  if (Object.keys(listOfCandidates).length !== 0) {
    Object.keys(listOfCandidates).map((address) => listReturn.push(address));
  }

  return listReturn;
>>>>>>> 0491b8a (fix explorer transactions ago and validator calls support besu)
}

export async function proposeValidator(
  rpcUrl: string,
  client: string,
  algorithm: string,
  address: string,
  vote: boolean // true to vote in, false to vote out
) {
<<<<<<< HEAD
  const methodDict: Clients = {
=======
  const methodDict: clients = {
>>>>>>> 0491b8a (fix explorer transactions ago and validator calls support besu)
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
<<<<<<< HEAD
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
=======
  const req = await ethApiCall(
    rpcUrl,
    methodDict[client as keyof clients][
      algorithm as keyof consensusAlgorithms
    ]!,
    [address, vote]
  );
  console.log(req);
  const status = req.status;
  return status;
>>>>>>> 0491b8a (fix explorer transactions ago and validator calls support besu)
}

export async function discardProposal(
  rpcUrl: string,
  client: string,
  algorithm: string,
  address: string
) {
<<<<<<< HEAD
  const methodDict: Clients = {
=======
  const methodDict: clients = {
>>>>>>> 0491b8a (fix explorer transactions ago and validator calls support besu)
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

<<<<<<< HEAD
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
=======
  const req = await ethApiCall(
    rpcUrl,
    methodDict[client as keyof clients][
      algorithm as keyof consensusAlgorithms
    ]!,
    [address]
  );
  // console.log(req);
  const status = req.status;
  return status;
>>>>>>> 0491b8a (fix explorer transactions ago and validator calls support besu)
}
