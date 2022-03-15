
import { ethApiCall } from './Common';
import { NodeDetails } from "../Types/API/Responses";

export async function updateNodeInfo(url: string) {
  let nodeDetails: NodeDetails =
    { statusText: "error", nodeId: "", nodeName: "", enode: "", ip: "", blocks: -1, peers: -1, queuedTxns: -1, pendingTxns: -1 }

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
    console.error("Node is unreachable. Ensure ports are open and client is running!")
    nodeDetails['statusText'] = "error";
    console.error(e);
  } finally {
    return nodeDetails;
  }
}


