
import { ethApiCall } from './common';
import { NodeDetails } from "./types/responses";
const axios = require('axios');

export async function updateNodeInfo(url:string) {
  let nodeDetails: NodeDetails= { statusText: "error", nodeId: "", nodeName: "", enode: "", ip: "", blocks: -1, peers: -1, queuedTxns: -1, pendingTxns:-1 }
  try {
    const adminNodeInfo = await ethApiCall(url, 'admin_nodeInfo'); 
    const ethBlockNumber = await ethApiCall(url, 'eth_blockNumber'); 
    const netPeerCount = await ethApiCall(url, 'net_peerCount'); 
    const txPoolStatus = await ethApiCall(url, 'txpool_status'); 
    nodeDetails['statusText'] = adminNodeInfo.statusText;
    nodeDetails['nodeId'] = adminNodeInfo.data.result.id;
    nodeDetails['nodeName'] = adminNodeInfo.data.result.name;
    nodeDetails['enode'] = adminNodeInfo.data.result.enode;
    nodeDetails['ip'] = adminNodeInfo.data.result.ip;
    nodeDetails['blocks'] = parseInt(ethBlockNumber.data.result, 16);
    nodeDetails['peers'] = parseInt(netPeerCount.data.result, 16);
    nodeDetails['queuedTxns'] = parseInt(txPoolStatus.data.result.queued, 16);
    nodeDetails['pendingTxns'] = parseInt(txPoolStatus.data.result.pending, 16);
  } catch (e) {
    console.error(e);
  } finally {
    return nodeDetails;
  }
}

export async function getBlockByNumber(url:string, blockNumber:string ='latest'){
  let blockDetails = { status: "error", number: "", hash: "", transactionsRoot: "", stateRoot: "", receiptsRoot: "", miner: "",  extraData: "", size: "", gasUsed: "", gasLimit: "" ,"timestamp": "", uncles: [], transactions: [] }
  try {
    const ethBlockByNumber = await ethApiCall(url, 'eth_getBlockByNumber', [blockNumber, true] ); 
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

