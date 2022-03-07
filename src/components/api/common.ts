
const axios = require('axios');

export async function ethApiCall(url:string, method:string, params:any[]=[] ){
  return axios({
    method: 'post',
    url: url,
    data: {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1
    },
    headers: {'Content-Type': 'application/json'}
  })
}

