import type { NextApiRequest, NextApiResponse } from "next";
import { ethApiCall } from "../../common/lib/ethApiCall";
import apiAuth from "../../common/lib/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const rpcUrl = req.body.rpcUrl;
  const peerDetails: any = [];

  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }

  try {
    const adminPeerInfo = await ethApiCall(rpcUrl, "admin_peers");
    adminPeerInfo.data.result.map((node: any) => {
      const constructPeers = {
        name: "",
        localAddress: "",
        remoteAddress: "",
        port: "",
        id: "",
        enode: "",
      };
      constructPeers["name"] = node.name;
      constructPeers["localAddress"] = node.network.localAddress;
      constructPeers["remoteAddress"] = node.network.remoteAddress;
      constructPeers["port"] = node.port;
      constructPeers["id"] = node.id;
      constructPeers["enode"] = node.enode;
      peerDetails.push(constructPeers);
    });
  } catch (e) {
    console.error("Could not call peers information");
  } finally {
    res.status(200).json(peerDetails);
    res.end();
  }
}
