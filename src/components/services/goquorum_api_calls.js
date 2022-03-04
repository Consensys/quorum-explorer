
const axios = require('axios');

export async function postAdminNodeInfo(url){
  return axios({
    method: 'post',
    url: url,
    data: {
        jsonrpc: '2.0',
        method: 'admin_nodeInfo',
        params: [],
        id: 1
    },
    headers: {'Content-Type': 'application/json'}
  })
}

