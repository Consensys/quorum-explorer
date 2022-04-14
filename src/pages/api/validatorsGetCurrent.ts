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
  let status = { "error": 1, "validators": [] }
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
    const res = await ethApiCall(
      rpcUrl,
      methodDict[client as keyof Clients][
        algorithm as keyof ConsensusAlgorithms
      ]!,
      ["latest"]
    );
    status = { "error": res.status, "validators": res.data.result }
  } catch (e) {
    console.error(e);
    console.error("Node is unreachable. Ensure ports are open and client is running!" );
  } finally {
    res.status(200).json(status);
  }
}


// export async function getPendingVotes(
//   rpcUrl: string,
//   client: string,
//   algorithm: string
// ) {
//   const methodDict: Clients = {
//     goquorum: {
//       qbft: "istanbul_candidates",
//       ibft: "istanbul_candidates",
//       raft: "", // No pending should go through basically instantly
//     },
//     besu: {
//       qbft: "qbft_getPendingVotes",
//       ibft: "ibft_getPendingVotes",
//       clique: "clique_proposals",
//     },
//   };
//   const listReturn: any = [];
//   try {
//     const req = await ethApiCall(
//       rpcUrl,
//       methodDict[client as keyof Clients][
//         algorithm as keyof ConsensusAlgorithms
//       ]!
//     );
//     const listOfCandidates = req.data.result;
//     if (Object.keys(listOfCandidates).length !== 0) {
//       Object.entries(listOfCandidates).map((values) => listReturn.push(values));
//     }
//     return listReturn;
//   } catch (e) {
//     console.log(e);
//     return [];
//   }
// }

// export async function proposeValidator(
//   rpcUrl: string,
//   client: string,
//   algorithm: string,
//   address: string,
//   vote: boolean // true to vote in, false to vote out
// ) {
//   const methodDict: Clients = {
//     goquorum: {
//       qbft: "istanbul_propose",
//       ibft: "istanbul_propose",
//       raft: "raft_addPeer",
//     },
//     besu: {
//       clique: "clique_proposals",
//       ibft: "ibft_proposeValidatorVote",
//       qbft: "qbft_proposeValidatorVote",
//     },
//   };
//   try {
//     const req = await ethApiCall(
//       rpcUrl,
//       methodDict[client as keyof Clients][
//         algorithm as keyof ConsensusAlgorithms
//       ]!,
//       [address, vote]
//     );
//     console.log(req);
//     const status = req.status;
//     return status;
//   } catch (e) {
//     console.log(e);
//     return 500;
//   }
// }

// export async function discardProposal(
//   rpcUrl: string,
//   client: string,
//   algorithm: string,
//   address: string
// ) {
//   const methodDict: Clients = {
//     goquorum: {
//       qbft: "istanbul_discard",
//       ibft: "istanbul_discard",
//       raft: "raft_removePeer",
//     },
//     besu: {
//       qbft: "qbft_discardValidatorVote",
//       ibft: "ibft_discardValidatorVote",
//       clique: "clique_discard",
//     },
//   };

//   try {
//     const req = await ethApiCall(
//       rpcUrl,
//       methodDict[client as keyof Clients][
//         algorithm as keyof ConsensusAlgorithms
//       ]!,
//       [address]
//     );
//     // console.log(req);
//     const status = req.status;
//     return status;
//   } catch (e) {
//     console.log(e);
//     return 500;
//   }
// }
