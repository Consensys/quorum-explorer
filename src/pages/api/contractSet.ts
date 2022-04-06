import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
//@ts-ignore
import Web3Quorum from "web3js-quorum";
import { CompiledContract } from "../../common/types/Contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body.client === "besu") {
    await besuSetValue(
      req.body.rpcUrl,
      req.body.privateUrl,
      req.body.value,
      req.body.contractAddress,
      req.body.compiledContract,
      req.body.fromPrivateKey,
      req.body.sender,
      req.body.privateFor
    ).then((value) => {
      res.status(200).json(value);
    });
  } else if (req.body.client === "goquorum") {
    await setValueAtAddress(
      req.body.rpcUrl,
      req.body.privateUrl,
      req.body.contractAddress,
      req.body.compiledContract,
      req.body.value,
      req.body.sender,
      req.body.fromPrivateKey,
      req.body.privateFor
    ).then((value) => {
      res.status(200).json(value);
    });
  }
}

async function setValueAtAddress(
  rpcUrl: string,
  privateUrl: string,
  contractAddress: string,
  compiledContract: CompiledContract,
  value: number,
  fromPublicKey: string,
  fromPrivateKey: string,
  privateFor: string[]
) {
  const abi = compiledContract.abi;
  const web3 = new Web3(rpcUrl);
  const chainId = await web3.eth.getChainId();
  const web3quorum = new Web3Quorum(web3, { privateUrl: privateUrl }, true);
  const contractInstance = new web3quorum.eth.Contract(abi, contractAddress);

  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contractInstance._jsonInterface.find((e: any) => {
    return e.name === "set";
  });

  const functionArgs = web3quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [value])
    .slice(2);

  const from = web3.eth.accounts.privateKeyToAccount(fromPrivateKey);
  // get the nonce for the sender ethereum account
  const txCount = await web3.eth.getTransactionCount(from.address);
  const data = functionAbi.signature + functionArgs;

  const functionParams = {
    chainId,
    nonce: txCount,
    gasPrice: 0, //ETH per unit of gas
    gasLimit: 0x24a22, //max number of gas units the tx is allowed to use
    value: 0,
    data,
    to: contractAddress,
    from,
    isPrivate: true,
    privateFrom: fromPublicKey,
    privateFor: privateFor,
  };

  const transaction = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transaction.transactionHash
  );
  return result;
}

async function besuSetValue(
  rpcUrl: string,
  privateUrl: string,
  value: number,
  contractAddress: string,
  compiledContract: CompiledContract,
  fromPrivateKey: string,
  fromPublicKey: string,
  toPublicKey: string[]
) {
  const abi = compiledContract.abi;
  const web3 = new Web3(rpcUrl);
  const web3quorum = new Web3Quorum(web3, { privateUrl: privateUrl });

  const contractInstance = new web3quorum.eth.Contract(abi, contractAddress);
  const functionAbi = contractInstance._jsonInterface.find((e: any) => {
    return e.name === "set";
  });
  const functionArgs = web3quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [value])
    .slice(2);
  const functionParams = {
    to: contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: fromPrivateKey.slice(2),
    privateFrom: fromPublicKey,
    privateFor: toPublicKey,
  };
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams
  );
  console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash
  );
  console.log(result);
  return result;
}
