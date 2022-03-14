
import { ethApiCall } from './Common';
import { QuorumBlock, QuorumTxn } from '../Types/Explorer';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');

export async function getBlockByNumber(url:string, blockNumber:string|number) {
  let quorumBlock: QuorumBlock = { statusText: "error", number: -1 , hash: "", transactionsRoot: "", stateRoot: "", receiptsRoot: "", miner: "",  extraData: "", size: "", gasUsed: "", gasLimit: "" ,"timestamp": "", uncles: [], transactions: [] }
  try {
    const ethBlockByNumber = await ethApiCall(url, 'eth_getBlockByNumber', [blockNumber, true]); 
    quorumBlock['statusText'] = ethBlockByNumber.statusText;
    quorumBlock['number'] = ethBlockByNumber.data.result.number;
    quorumBlock['hash'] = ethBlockByNumber.data.result.hash;
    quorumBlock['transactionsRoot'] = ethBlockByNumber.data.result.transactionsRoot;
    quorumBlock['stateRoot'] = ethBlockByNumber.data.result.stateRoot;
    quorumBlock['receiptsRoot'] = ethBlockByNumber.data.result.receiptsRoot;
    quorumBlock['miner'] = ethBlockByNumber.data.result.miner;
    quorumBlock['extraData'] = ethBlockByNumber.data.extraData;
    quorumBlock['size'] = ethBlockByNumber.data.result.size;
    quorumBlock['gasUsed'] = ethBlockByNumber.data.result.gasUsed;
    quorumBlock['gasLimit'] = ethBlockByNumber.data.result.gasLimit;
    quorumBlock['timestamp'] = ethBlockByNumber.data.result.timestamp;
    quorumBlock['uncles'] = ethBlockByNumber.data.result.uncles;
    quorumBlock['transactions'] = ethBlockByNumber.data.result.transactions;
  } catch (e) {
    console.error(e);
  } finally {
    return quorumBlock;
  }
}

export function getSecsAgo(h: string) {
  const ago : number = parseInt(h, 10);
  const now : any = new Date();
  const d = now - ago;
  const dts = new Date(d);
  return dts.getSeconds();
}

export function abbreviateValidator(s: string) {
  const len = s.length
  return s.slice(0,10)+'...'+s.slice(len-6);
}