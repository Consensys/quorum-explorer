import type { NextApiRequest, NextApiResponse } from "next";
import { getTesseraKeys } from "../../common/api/getTesseraKeys";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await getTesseraKeys(req.body.privateTxUrl);
  res.status(200).json(result);
}
