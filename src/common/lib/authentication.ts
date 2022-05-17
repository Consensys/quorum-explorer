import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

export default async function apiAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authStatus = process.env.DISABLE_AUTH;
  const session = await getSession({ req });
  if (authStatus === "true") {
    return true;
  }
  if (!session) {
    /// Not Signed in
    res.status(401).end();
    return false;
  } else {
    return true;
  }
}
