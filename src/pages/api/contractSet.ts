import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
//@ts-ignore
import Web3Quorum from "web3js-quorum";
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
    req.body.value,
    req.body.sender,
    req.body.privateFor
  );
  await setValueAtAddress(
    req.body.client,
    req.body.rpcUrl,
    req.body.privateUrl,
    req.body.contractAddress,
    req.body.compiledContract,
    req.body.value,
    req.body.sender,
    req.body.privateFor
  ).then((value) => {
    res.status(200).json(value);
  });
}

async function setValueAtAddress(
  client: string,
  rpcUrl: string,
  privateUrl: string,
  contractAddress: string,
  compiledContract: CompiledContract,
  value: number,
  sender: string,
  privateFor: string[]
) {
  const abi = compiledContract.abi;
  const web3 = new Web3(rpcUrl);
  const web3quorum = new Web3Quorum(
    web3,
    { privateUrl: privateUrl },
    client === "goquorum"
  );

  const contractInstance = new web3quorum.eth.Contract(abi, contractAddress);
  const res = await contractInstance.methods
    .set(value)
    .send({
      from: sender,
      privateFor: privateFor,
      gasLimit: "0x24A22",
    })
    .catch(console.error);
  console.log(`set value` + res);
  return res;
}
