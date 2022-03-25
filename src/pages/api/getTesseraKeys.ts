import type { NextApiRequest, NextApiResponse } from "next";
import { getTesseraKeys } from "../../common/api/getTesseraKeys";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [selfKey, allKeys] = await getTesseraKeys(req.body.privateTxUrl);
  res.status(200).json(allKeys);
}
