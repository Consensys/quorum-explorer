import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { SignedTransaction, TransactionConfig } from "web3-core";
import apiAuth from "../../common/lib/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }
  const amount = req.body.amount;
  const accountTo = req.body.accountTo;
  const privateKeyFrom = req.body.privateKeyFrom;
  const rpcUrl = req.body.rpcUrl;
  let status = { error: 1, txHash: "", txReceipt: {} };
  try {
    const web3 = new Web3(rpcUrl);
    const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKeyFrom);
    // var accountFromBalance = web3.utils.fromWei(await web3.eth.getBalance(accountFrom.address));
    console.log("Creating transaction options...");
    const rawTxOptions: TransactionConfig = {
      nonce: await web3.eth.getTransactionCount(accountFrom.address),
      from: accountFrom.address,
      to: accountTo,
      data: "0x",
      value: amount, // amount of wei to transfer
      gasPrice: "0x0", //ETH per unit of gas - free gas network
      gas: "0x24A22",
    };
    console.log("Creating transaction...");
    const signedTx: SignedTransaction = await web3.eth.accounts.signTransaction(
      rawTxOptions,
      privateKeyFrom
    );
    console.log("Sending transaction...");
    const receiptTx = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction as string
    );
    status = {
      error: 0,
      txHash: receiptTx.transactionHash,
      txReceipt: receiptTx,
    };
  } catch (e) {
    console.error(e);
    console.error(
      "Node is unreachable. Ensure ports are open and client is running!"
    );
  } finally {
    res.status(200).json(status);
  }
}
