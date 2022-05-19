import type { NextApiRequest, NextApiResponse } from "next";
import apiAuth from "../../common/lib/authentication";
import { ethApiCall } from "../../common/lib/ethApiCall";
import { QuorumWallet } from "../../common/types/Wallets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);

  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }

  const account = req.body.account;
  const rpcUrl = req.body.rpcUrl;
  let status: QuorumWallet = { account: account, balance: -1 };
  try {
    const res = await ethApiCall(rpcUrl, "eth_getBalance", [account, "latest"]);
    status = { account: account, balance: res.data.result };
  } catch (e) {
    console.error(e);
    console.error(
      "Node is unreachable. Ensure ports are open and client is running!"
    );
  } finally {
    res.status(200).json(status);
  }
}
