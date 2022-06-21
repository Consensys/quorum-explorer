import type { NextApiRequest, NextApiResponse } from "next";
import { ethApiCall } from "../../common/lib/ethApiCall";
import { QuorumBlock } from "../../common/types/Explorer";
import apiAuth from "../../common/lib/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const blockNumber = req.body.blockNumber;
  const rpcUrl = req.body.rpcUrl;
  let quorumBlock: QuorumBlock = {
    statusText: "error",
    number: "-1",
    hash: "",
    transactionsRoot: "",
    stateRoot: "",
    receiptsRoot: "",
    miner: "",
    extraData: "",
    size: "",
    gasUsed: "",
    gasLimit: "",
    timestamp: Date(),
    uncles: [],
    transactions: [],
  };

  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }

  try {
    const ethBlockByNumber = await ethApiCall(rpcUrl, "eth_getBlockByNumber", [
      blockNumber,
      true,
    ]);
    quorumBlock["statusText"] = ethBlockByNumber.statusText;
    quorumBlock["number"] = ethBlockByNumber.data.result.number;
    quorumBlock["hash"] = ethBlockByNumber.data.result.hash;
    quorumBlock["transactionsRoot"] =
      ethBlockByNumber.data.result.transactionsRoot;
    quorumBlock["stateRoot"] = ethBlockByNumber.data.result.stateRoot;
    quorumBlock["receiptsRoot"] = ethBlockByNumber.data.result.receiptsRoot;
    quorumBlock["miner"] = ethBlockByNumber.data.result.miner;
    quorumBlock["extraData"] = ethBlockByNumber.data.extraData;
    quorumBlock["size"] = ethBlockByNumber.data.result.size;
    quorumBlock["gasUsed"] = ethBlockByNumber.data.result.gasUsed;
    quorumBlock["gasLimit"] = ethBlockByNumber.data.result.gasLimit;
    quorumBlock["timestamp"] = ethBlockByNumber.data.result.timestamp;
    quorumBlock["uncles"] = ethBlockByNumber.data.result.uncles;
    quorumBlock["transactions"] = ethBlockByNumber.data.result.transactions;
  } catch (e) {
    console.error(
      "Node is unreachable. Ensure ports are open and client is running!"
    );
    res.status(500);
  } finally {
    res.status(200).json(quorumBlock);
    res.end();
  }
}
