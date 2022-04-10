
import { ethApiCall } from './common';
import { QuorumWallet } from '../types/Wallets';
import Web3 from 'web3';
import { SignedTransaction, TransactionConfig } from 'web3-core';

export async function getAccountBalance(url: string, account: string) {
  const balanceInfo = await ethApiCall(url, 'eth_getBalance', [account, 'latest'])
  const QuorumWallet = {"account": account, "balance": balanceInfo.data.result}
  return QuorumWallet;
}

export async function transferEth(url:string, privateKeyFrom:string, accountTo:string, amount:string) {
  let status = { "error": 1, "txHash":"", "txReceipt":{} }
  try {
    const web3 = new Web3(url);
    const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKeyFrom);
    var accountFromBalance = web3.utils.fromWei(await web3.eth.getBalance(accountFrom.address));
    console.log("Creating transaction options...");
    const rawTxOptions :  TransactionConfig = {
      nonce: await web3.eth.getTransactionCount(accountFrom.address),
      from: accountFrom.address,
      to: accountTo, 
      data: "0x",
      value: amount,    // amount of wei to transfer
      gasPrice: "0x0",  //ETH per unit of gas - free gas network
      gas: "0x24A22" 
    };
    console.log("Creating transaction...");
    const signedTx : SignedTransaction = await web3.eth.accounts.signTransaction(rawTxOptions, privateKeyFrom)
    console.log("Sending transaction...");
    const receiptTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);
    status = { "error": 0, "txHash": receiptTx.transactionHash, "txReceipt": receiptTx }
  } catch (e) {
    console.error(e);
  } finally {
    return status;
  }

}