import type { NextApiRequest, NextApiResponse } from "next";
import { NodeDetails } from "../../common/types/api/responses";
import { ethApiCall } from "../../common/lib/ethApiCall";
import apiAuth from "../../common/lib/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const userClient = req.body.client;
  const rpcUrl = req.body.rpcUrl;
  let nodeDetails: NodeDetails = {
    statusText: "error",
    nodeId: "",
    nodeName: "",
    enode: "",
    ip: "",
    blocks: -1,
    peers: -1,
    queuedTxns: -1,
    pendingTxns: -1,
  };

  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }

  try {
    const adminNodeInfo = await ethApiCall(rpcUrl, "admin_nodeInfo");
    const ethBlockNumber = await ethApiCall(rpcUrl, "eth_blockNumber");
    const netPeerCount = await ethApiCall(rpcUrl, "net_peerCount");
    const txPoolStatus = await ethApiCall(
      rpcUrl,
      userClient === "goquorum" ? "txpool_status" : "txpool_besuTransactions"
    );
    nodeDetails["statusText"] = adminNodeInfo.statusText;
    nodeDetails["nodeId"] = adminNodeInfo.data.result.id;
    nodeDetails["nodeName"] = adminNodeInfo.data.result.name;
    nodeDetails["enode"] = adminNodeInfo.data.result.enode;
    nodeDetails["ip"] = adminNodeInfo.data.result.ip;
    nodeDetails["blocks"] = parseInt(ethBlockNumber.data.result, 16);
    nodeDetails["peers"] = parseInt(netPeerCount.data.result, 16);
    // txpool results
    // besu = {"jsonrpc": "2.0", "id": 1, "result": [] }
    // goq = { "jsonrpc": "2.0", "id": 1, "result": : {pending: '0x0', queued: '0x0'} }
    const besuOrGoQTxns =
      userClient === "goquorum"
        ? parseInt(txPoolStatus.data.result.queued, 16)
        : txPoolStatus.data.result.length;

    if (txPoolStatus.data.result === undefined) {
      console.log(
        "TXPOOL API method is not set for rpc-http-api and rpc-ws-api for Besu"
      );
    }
    nodeDetails["queuedTxns"] = besuOrGoQTxns;
    nodeDetails["pendingTxns"] = besuOrGoQTxns;
  } catch (e) {
    console.error(e);
    console.error(
      "Node is unreachable. Ensure ports are open and client is running!"
    );
    nodeDetails["statusText"] = "error";
  } finally {
    res.status(200).json(nodeDetails);
    res.end();
  }
}
