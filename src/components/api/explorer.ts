
import { ethApiCall } from './common';
import { BlockDetails } from '../types/api/responses';
const axios = require('axios');

export async function getBlockByNumber(url:string, blockNumber:string|number) {
  let blockDetails: BlockDetails = { statusText: "error", number: -1 , hash: "", transactionsRoot: "", stateRoot: "", receiptsRoot: "", miner: "",  extraData: "", size: "", gasUsed: "", gasLimit: "" ,"timestamp": "", uncles: [], transactions: [] }
  try {
    const ethBlockByNumber = await ethApiCall(url, 'eth_getBlockByNumber', [blockNumber, true]); 
    blockDetails['statusText'] = ethBlockByNumber.statusText;
    blockDetails['number'] = ethBlockByNumber.data.result.number;
    blockDetails['hash'] = ethBlockByNumber.data.result.hash;
    blockDetails['transactionsRoot'] = ethBlockByNumber.data.result.transactionsRoot;
    blockDetails['stateRoot'] = ethBlockByNumber.data.result.stateRoot;
    blockDetails['receiptsRoot'] = ethBlockByNumber.data.result.receiptsRoot;
    blockDetails['miner'] = ethBlockByNumber.data.miner;
    blockDetails['extraData'] = ethBlockByNumber.data.extraData;
    blockDetails['size'] = ethBlockByNumber.data.result.size;
    blockDetails['gasUsed'] = ethBlockByNumber.data.result.gasUsed;
    blockDetails['gasLimit'] = ethBlockByNumber.data.result.gasLimit;
    blockDetails['timestamp'] = ethBlockByNumber.data.result.timestamp;
    blockDetails['uncles'] = ethBlockByNumber.data.result.uncles;
    blockDetails['transactions'] = ethBlockByNumber.data.result.transactions;
  } catch (e) {
    console.error(e);
  } finally {
    return blockDetails;
  }
}

