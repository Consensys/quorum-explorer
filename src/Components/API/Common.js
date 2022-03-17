import axios from "axios";

export async function ethApiCall(url, method, params = []) {
  return axios({
    method: "post",
    url: url,
    data: {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    },
    headers: { "Content-Type": "application/json" },
  });
}
