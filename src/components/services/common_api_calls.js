
const axios = require('axios');

export async function postAdminNodeInfo(url){
  let nodeInfo = { status: "error", nodeId: "", nodeName: "", enode: "", ip: "" }
  try {
    const res = await axios({
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
    nodeInfo['status'] = res.statusText;
    nodeInfo['nodeId'] = res.data.result.id;
    nodeInfo['nodeName'] = res.data.result.name;
    nodeInfo['enode'] = res.data.result.enode;
    nodeInfo['ip'] = res.data.result.ip;
  }catch (e) {
    console.error(e);
  } finally {
    return nodeInfo;
  }
}

