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
  if (req.body.client === "besu") {
    await besuGetValue(
      // still needs to be updated with proper values
      req.body.rpcUrl,
      req.body.contractAddress,
      req.body.compiledContract,
      req.body.fromPrivateKey,
      req.body.privateFrom,
      req.body.privateFor
    ).then((value) => {
      res.status(200).json(value);
    });
  } else if (req.body.client === "goquorum") {
    await readValueAtAddress(
      req.body.client,
      req.body.rpcUrl,
      req.body.privateUrl,
      req.body.contractAddress,
      req.body.compiledContract
    ).then((value) => {
      res.status(200).json(value);
    });
  }
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
    { privateUrl: privateUrl }
    // client === "goquorum"
  );
  const contractInstance = new web3quorum.eth.Contract(abi, contractAddress);
  // contractInstance.defaultCommon.customChain = {name: 'GoQuorum', chainId: 1337};
  const res = await contractInstance.methods.get().call().catch(console.error);
  console.log("obtained value at deployed contract is: " + res);
  return res;
}

async function besuGetValue(
  rpcUrl: string,
  contractAddress: string,
  compiledContract: CompiledContract,
  fromPrivateKey: string,
  fromPublicKey: string,
  toPublicKey: string[]
) {
  const web3 = new Web3(rpcUrl);
  const chainId = await web3.eth.getChainId();
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(compiledContract.abi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find((e: any) => {
    return e.name === "get";
  });
  const functionParams = {
    to: contractAddress,
    data: functionAbi.signature,
    privateKey: fromPrivateKey.slice(2),
    privateFrom: fromPublicKey,
    privateFor: toPublicKey,
  };
  console.log(functionParams);
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );
  const convertToDec = parseInt(result.output, 16);
  console.log("Value from deployed contract is: " + convertToDec);
  return convertToDec;
}
