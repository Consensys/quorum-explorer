import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
//@ts-ignore
import Web3Quorum from "web3js-quorum";
import apiAuth from "../../common/lib/authentication";
import { CompiledContract } from "../../common/types/Contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }
  // console.log(req.body);
  if (req.body.client === "besu") {
    await besuReadValueAtAddress(
      // still needs to be updated with proper values
      req.body.rpcUrl,
      req.body.contractAddress,
      req.body.compiledContract,
      req.body.fromPrivateKey,
      req.body.privateFrom,
      req.body.privateFor,
      req.body.functionToCall,
      req.body.functionArgs
    ).then((value) => {
      res.status(200).json(value);
    });
  } else if (req.body.client === "goquorum") {
    await readValueAtAddress(
      req.body.client,
      req.body.rpcUrl,
      req.body.privateUrl,
      req.body.contractAddress,
      req.body.compiledContract,
      req.body.functionToCall,
      req.body.functionArgs
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
  compiledContract: CompiledContract,
  functionToCall: string,
  functionArgs: any
) {
  console.log("calling contract function: " + functionToCall);
  const abi = compiledContract.abi;
  const web3 = new Web3(rpcUrl);
  const web3quorum = Web3Quorum(web3, { privateUrl: privateUrl }, true);
  const contractInstance = new web3quorum.eth.Contract(abi, contractAddress);

  const functionAbi = contractInstance._jsonInterface.find((e: any) => {
    return e.name === functionToCall;
  });
  if (functionAbi === undefined) {
    throw "Called function not in ABI";
  }

  if (functionArgs === undefined || functionArgs.length === 0) {
    const res = await contractInstance.methods[functionToCall]()
      .call()
      .catch(console.error);
    console.log(
      "obtained value at deployed contract is: " + JSON.stringify(res)
    );
    return JSON.stringify(res);
  } else {
    const superArray = functionArgs.map((a: any) => a.value);

    const res = await contractInstance.methods[functionToCall](...superArray)
      .call()
      .catch(console.error);
    console.log(
      "obtained value at deployed contract is: " + JSON.stringify(res)
    );
    return JSON.stringify(res);
  }
}

async function besuReadValueAtAddress(
  rpcUrl: string,
  contractAddress: string,
  compiledContract: CompiledContract,
  fromPrivateKey: string,
  fromPublicKey: string,
  toPublicKey: string[],
  functionToCall: string,
  functionArgs: any
) {
  console.log("calling contract function: " + functionToCall);
  const web3 = new Web3(rpcUrl);
  const chainId = await web3.eth.getChainId();
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(compiledContract.abi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find((e: any) => {
    return e.name === functionToCall;
  });
  console.log("Function ABI: " + JSON.stringify(functionAbi));
  const functionCallParams = functionArgs.map((_: any) => _.value);
  const functionEncoded = web3quorum.eth.abi
    .encodeParameters(functionAbi.inputs, functionCallParams)
    .slice(2);
  const functionParams = {
    to: contractAddress,
    data: functionAbi.signature + functionEncoded,
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

  if (functionAbi.outputs.length > 0) {
    const funcOutputTypes = functionAbi.outputs.map((x: any) => x.type);
    const outputSimplified = web3.eth.abi.decodeParameters(
      funcOutputTypes,
      result.output
    );
    console.log("Raw value from deployed contract is: " + result.output);
    console.log("Type to decode is: " + funcOutputTypes);
    console.log("Value from deployed contract is: ");
    console.log(outputSimplified);
    return outputSimplified;
  } else {
    console.log(
      "Raw value from deployed contract is: " + JSON.stringify(result)
    );
    return result.output;
  }
}
