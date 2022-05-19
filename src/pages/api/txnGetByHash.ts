import type { NextApiRequest, NextApiResponse } from "next";
import apiAuth from "../../common/lib/authentication";
import { ethApiCall } from "../../common/lib/ethApiCall";
import { QuorumTxn } from "../../common/types/Explorer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const txnHash = req.body.txnHash;
  const rpcUrl = req.body.rpcUrl;
  let quorumTxn: QuorumTxn = {
    blockHash: "error",
    blockNumber: -1,
    from: "",
    gas: -1,
    gasPrice: -1,
    hash: "",
    input: "",
    nonce: -1,
    to: "",
    transactionIndex: -1,
    value: "",
    r: "",
    s: "",
    v: "",
  };

  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }

  try {
    const ethTxnByHash = await ethApiCall(rpcUrl, "eth_getTransactionByHash", [
      txnHash,
    ]);
    quorumTxn["blockHash"] = ethTxnByHash.data.result.blockHash;
    quorumTxn["blockNumber"] = ethTxnByHash.data.result.blockNumber;
    quorumTxn["from"] = ethTxnByHash.data.result.from;
    quorumTxn["gas"] = ethTxnByHash.data.result.gas;
    quorumTxn["gasPrice"] = ethTxnByHash.data.result.gasPrice;
    quorumTxn["hash"] = ethTxnByHash.data.result.hash;
    quorumTxn["input"] = ethTxnByHash.data.result.input;
    quorumTxn["nonce"] = ethTxnByHash.data.result.nonce;
    quorumTxn["to"] = ethTxnByHash.data.result.to;
    quorumTxn["transactionIndex"] = ethTxnByHash.data.result.transactionIndex;
    quorumTxn["value"] = ethTxnByHash.data.result.value;
    quorumTxn["r"] = ethTxnByHash.data.result.r;
    quorumTxn["s"] = ethTxnByHash.data.result.s;
    quorumTxn["v"] = ethTxnByHash.data.result.v;
  } catch (e) {
    console.error(e);
    console.error(
      "Node is unreachable. Ensure ports are open and client is running!"
    );
    res.status(500);
  } finally {
    res.status(200).json(quorumTxn);
    res.end();
  }
}
