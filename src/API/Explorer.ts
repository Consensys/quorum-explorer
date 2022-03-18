import { ethApiCall } from "./Common";
import { QuorumBlock, QuorumTxn } from "../Components/Types/Explorer";

export function getSecsAgo(
  h: string
) {
  const ago: number = parseInt(h, 10);
  const now: any = new Date();
  const d = now - ago;
  const dts = new Date(d);
  return dts.getSeconds();
}

export function abbreviateValidator(
  s: string
) {
  const len = s.length;
  return s.slice(0, 10) + "..." + s.slice(len - 6);
}

//get the latest n elements in an array
export function updateBlockArray(
  arr: QuorumBlock[],
  elem: QuorumBlock,
  len: number
) {
  if (arr.length > 0 && arr[0]["number"] === elem["number"]) {
  } else {
    arr.unshift(elem);
  }
  return arr.slice(0, len);
}

//get the latest n elements in an array
export function updateTxnArray(
  arr: QuorumTxn[],
  elems: QuorumTxn[],
  len: number
) {
  elems.map((_) => arr.unshift(_));
  var set = new Set(arr);
  arr = Array.from(set);
  return arr.slice(0, len);
}

export async function getTxnByHash(
  url: string,
  txnHash: string
) {
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
  try {
    const ethTxnByHash = await ethApiCall(url, "eth_getTransactionByHash", [
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
  } finally {
    return quorumTxn;
  }
}

export async function getBlockByNumber(
  url: string,
  blockNumber: string | number
) {
  let quorumBlock: QuorumBlock = {
    statusText: "error",
    number: -1,
    hash: "",
    transactionsRoot: "",
    stateRoot: "",
    receiptsRoot: "",
    miner: "",
    extraData: "",
    size: "",
    gasUsed: "",
    gasLimit: "",
    timestamp: "",
    uncles: [],
    transactions: [],
  };
  try {
    const ethBlockByNumber = await ethApiCall(url, "eth_getBlockByNumber", [
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
    console.error(e);
  } finally {
    return quorumBlock;
  }
}
