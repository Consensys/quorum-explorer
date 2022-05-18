import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { QuorumConfig } from "../../common/types/QuorumConfig";
import { getMemberList } from "../../common/lib/quorumConfig";
import apiAuth from "../../common/lib/authentication";

type KeysList = {
  keys: SingleKey[];
};

type SingleKey = {
  key: string;
};

async function getTesseraKeys(config: QuorumConfig) {
  // get self Tessera key with /keys
  // get all Tessera keys on network with /partyinfo/keys
  // either remove self key from output or give indicator that it is current selection
  const memberList = getMemberList(config);
  const final: { label: string; options: any[] }[] = [];

  for (let x of memberList) {
    const selfKey = x.privateTxUrl + "/keys";
    const getAllKeys = x.privateTxUrl + "/partyinfo/keys";

    await axios
      .get<KeysList>(selfKey, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        final.push({
          label: x.name,
          options: [
            { value: res.data.keys[0].key, label: res.data.keys[0].key },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return final;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }

  const result = await getTesseraKeys(req.body.config);
  res.status(200).json(result);
  res.end();
}
