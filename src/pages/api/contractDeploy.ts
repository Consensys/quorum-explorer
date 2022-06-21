import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
//@ts-ignore
import Web3Quorum from "web3js-quorum";
import axios from "axios";
import apiAuth from "../../common/lib/authentication";
import { configReader } from "../../common/lib/getConfig";
import { QuorumNode } from "../../common/types/QuorumConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }
  // console.log(req.body);
  await deployContract(
    req.body.client,
    req.body.rpcUrl,
    req.body.privateUrl,
    req.body.accountPrivateKey,
    req.body.privateForList,
    req.body.compiledContract,
    req.body.deployArgs
  )
    .then((txHash) => {
      res.status(200).json(txHash);
    })
    .catch((e) => {
      console.error(e);
      res.status(500);
      res.end();
    });
}

function constructorInitValues(web3: Web3, deployArgs: any) {
  const stypes = deployArgs[0].map((_: any) => _.type);
  const values = deployArgs[1];
  return web3.eth.abi.encodeParameters(stypes, values).slice(2);
}

export async function deployContract(
  client: string,
  rpcUrl: string,
  privateUrl: string,
  accountPrivateKey: string,
  privateForList: string[],
  compiledContract: any,
  deployArgs: any
) {
  // Verify that privateUrl cannot be subject to a server-side request forgery
  const getConf = JSON.parse(await configReader());
  const rpcList = getConf.nodes.map((x: QuorumNode) => {
    return x.privateTxUrl;
  });
  if (!rpcList.includes(privateUrl)) {
    throw "Provided URL is not in allow list";
  }
  const abi = compiledContract.abi;
  const bytecode = compiledContract.bytecode;
  const gasEstimate =
    parseInt(compiledContract.gasEstimates.creation.codeDepositCost) * 2;

  const web3 = new Web3(rpcUrl);
  const web3quorum = new Web3Quorum(
    web3,
    { privateUrl: privateUrl },
    client === "goquorum" ? true : false
  );
  const account = web3.eth.accounts.privateKeyToAccount(accountPrivateKey);
  const txCount = await web3.eth.getTransactionCount(
    account.address,
    "pending"
  );
  const chainId = await web3.eth.getChainId();

  const fromTxPublicKey = await axios
    .get(privateUrl + "/keys", {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data.keys[0].key);
  const constructorValues: string = constructorInitValues(web3, deployArgs);
  const txOptions = {
    chainId,
    nonce: txCount,
    gasPrice: 0, //ETH per unit of gas
    gasLimit: gasEstimate,
    value: 0,
    data: "0x" + bytecode + constructorValues,
    from: account,
    isPrivate: true,
    privateKey: accountPrivateKey.slice(2),
    privateFrom: fromTxPublicKey,
    privateFor: privateForList,
  };

  console.log("Creating contract...");

  // Generate and send the Raw transaction to the Besu node using the eea_sendRawTransaction JSON-RPC call
  const txHash = await web3quorum.priv.generateAndSendRawTransaction(txOptions);
  console.log("TxHash for Deploy: ", txHash);
  if (client === "besu") {
    const result = await web3quorum.priv.waitForTransactionReceipt(txHash);
    console.log("Getting contractAddress from txHash: ", result);
    return result;
  } else if (client === "goquorum") {
    return txHash;
  }
}
