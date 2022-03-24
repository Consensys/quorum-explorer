import axios from "axios";

export type allKeys = {
  keys: singleKey[];
};

export type singleKey = {
  key: string;
};

export async function getTesseraKeys(tesseraUrl: string) {
  // get self Tessera key with /keys
  // get all Tessera keys on network with /partyinfo/keys
  // either remove self key from output or give indicator that it is current selection

  const selfKey = tesseraUrl + "/keys";
  const getAllKeys = tesseraUrl + "/partyinfo/keys";

  const selfKeyRes = await axios
    .get<allKeys>(selfKey, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data.keys[0].key;
    });

  const allKeysRes = await axios
    .get<allKeys>(getAllKeys, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const keyList: string[] = [];
      res.data.keys.map((keyObj) => {
        keyList.push(keyObj.key);
      });
      return keyList;
    });

  return [selfKeyRes, allKeysRes]; // destructure with const [self, all] = function()
}
