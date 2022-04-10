import { QuorumBlock, QuorumTxn } from "../types/Explorer";

export function getSecsAgo(h: string) {
  const ago: Date = new Date(parseInt(h, 16)); // convert to decimal unix time
  const now: Date = new Date();
  const d = Math.abs(ago.getTime() - now.getTime() / 1000);
  return Math.trunc(d);
}

export function abbreviateValidator(s: string) {
  const len = s.length;
  return s.slice(0, 10) + "..." + s.slice(len - 6);
}

//get the latest n elements in an array
export function updateBlockArray(
  arr: QuorumBlock[],
  elem: QuorumBlock,
  len: number
) {
  if (arr.length > 0 && arr[0]["number"] === elem["number"]) {
  } else {
    arr.unshift(elem);
  }
  return arr.slice(0, len);
}

//get the latest n elements in an array
export function updateTxnArray(
  arr: QuorumTxn[],
  elems: QuorumTxn[],
  len: number
) {
  elems.map((_) => arr.unshift(_));
  var set = new Set(arr);
  arr = Array.from(set);
  return arr.slice(0, len);
}

