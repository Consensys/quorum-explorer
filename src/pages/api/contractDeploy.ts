import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
//@ts-ignore
import Web3Quorum from "web3js-quorum";
import axios from "axios";
import { CompiledContract } from "../../common/types/Contracts";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const session = await getSession({ req });
  if (!session) {
    /// Not Signed in
    res.status(401).end();
    return;
  }
  await deployContract(
    req.body.client,
    req.body.rpcUrl,
    req.body.privateUrl,
    req.body.accountPrivateKey,
    req.body.privateForList,
    req.body.compiledContract,
    req.body.deployArgs
  ).then((txHash) => {
    res.status(200).json(txHash);
  });
}

function paddingHex(paddingNo = 64, toPad: string) {
  const toHex = parseInt(toPad).toString(16);
  return "0".repeat(paddingNo - toHex.length) + toHex;
}

export async function deployContract(
  client: string,
  rpcUrl: string,
  privateUrl: string,
  accountPrivateKey: string,
  privateForList: string[],
  compiledContract: CompiledContract,
  deployArgs: any
) {
  const abi = compiledContract.abi;
  const bytecode = compiledContract.bytecode;

  const web3 = new Web3(rpcUrl);
  const web3quorum = new Web3Quorum(
    web3,
    { privateUrl: privateUrl },
    client === "goquorum" ? true : false
  );

  const account = web3.eth.accounts.privateKeyToAccount(accountPrivateKey);
  const txCount = await web3.eth.getTransactionCount(account.address);
  const chainId = await web3.eth.getChainId();
  const fromTxPublicKey = await axios
    .get(privateUrl + "/keys", {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data.keys[0].key);
  const txOptions = {
    chainId,
    nonce: txCount,
    gasPrice: 0, //ETH per unit of gas
    gasLimit: 0x24a22, //max number of gas units the tx is allowed to use
    value: 0,
    data: "0x" + bytecode + paddingHex(64, deployArgs),
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
