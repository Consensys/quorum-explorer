import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import apiAuth from "../../common/lib/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const rpcUrl = req.body.rpcUrl;

  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const getNet = await provider.getNetwork();
  res.status(200).json({
    chainId: "0x" + getNet.chainId.toString(16),
    chainName: getNet.name,
  });
  res.end();
}
