import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //@ts-ignore
  fs.readFile(`${process.env.QE_CONFIG_PATH}`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    res.status(200).json(data);
  });
}