import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
//@ts-ignore
import Web3Quorum from "web3js-quorum";
import axios from "axios";
import { CompiledContract } from "../../common/types/Contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    req.body.client,
    req.body.rpcUrl,
    req.body.privateUrl,
    req.body.contractAddress,
    req.body.compiledContract,
  );
  await readValueAtAddress(
    req.body.client,
    req.body.rpcUrl,
    req.body.privateUrl,
    req.body.contractAddress,
    req.body.compiledContract,
  ).then((value) => {
    res.status(200).json(value);
  });
}

async function readValueAtAddress(
  client: string,
  rpcUrl: string,
  privateUrl: string,
  contractAddress: string,
  compiledContract: CompiledContract
) {
  const abi = compiledContract.abi;
  const web3 = new Web3(rpcUrl);
  const web3quorum = new Web3Quorum(
    web3,
    { privateUrl: privateUrl },
    client === "goquorum"
  );
  const contractInstance = new web3.eth.Contract(abi, contractAddress);
  // contractInstance.defaultCommon.customChain = {name: 'GoQuorum', chainId: 1337};
  const res = await contractInstance.methods.get().call().catch(() => {});
  console.log("obtained value at deployed contract is: "+ res);
  return res;
}