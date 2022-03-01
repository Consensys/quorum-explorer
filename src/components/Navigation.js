import * as React from 'react';
const nodesConfig = require('../config/nodes.json');

const pages = ['Dashboard', 'Explorer', 'Contracts'];
const nodes = Object.keys(nodesConfig);

function Navigation() {

  return (
  
    <div>
      <p>LOGO</p>

      <div>
      <a href="/Dashboard"><button>Dashboard</button></a>
      <a href="/Explorer"><button>Explorer</button></a>
      <a href="/Contracts"><button>Contracts</button></a>
      </div>

      <div class="dropdown">
        <button onClick="myFunction()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content">
          <a href="#">rpcnode</a>
          <a href="#">node1</a>
          <a href="#">node2</a>
        </div>
      </div>
    </div>

  );
};
export default Navigation;
