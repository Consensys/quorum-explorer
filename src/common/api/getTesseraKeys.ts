import axios from "axios";
import { QuorumNode, QuorumConfig } from "../types/QuorumConfig";
import { getMemberList } from "./quorumConfig";

export type allKeys = {
  keys: singleKey[];
};

export type singleKey = {
  key: string;
};

export async function getTesseraKeys(config: QuorumConfig) {
  // get self Tessera key with /keys
  // get all Tessera keys on network with /partyinfo/keys
  // either remove self key from output or give indicator that it is current selection
  const memberList = getMemberList(config);
  const final: { label: string; options: any[] }[] = [];
  for (let x of memberList) {
    const selfKey = x.privateTxUrl + "/keys";
    const getAllKeys = x.privateTxUrl + "/partyinfo/keys";

    await axios
      .get<allKeys>(selfKey, {
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
      });
  }
  return final;
}
