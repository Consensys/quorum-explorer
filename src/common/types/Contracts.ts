export interface buttonLoading {
  [key: string]: boolean;
}

export type SCDFunctionArg = {
  name: string;
  type: string;
  value: any;
};

export type SCDConstructor = {
  inputs: SCDFunctionArg[];
};

export const VoidSCDConstructor: SCDConstructor = {
  inputs: [],
};

export type SCDFunction = {
  inputs: SCDFunctionArg[];
  outputs: SCDFunctionArg[];
  name: string;
};
// todo check on this type - we don't really use it atm
export type SCDEvent = {
  inputs: SCDFunctionArg[];
  outputs: SCDFunctionArg[];
  name: string;
};

export type SCDefinition = {
  constructor: SCDConstructor;
  functions: SCDFunction[];
  events: SCDEvent[];
};

export const VoidSCDefinition: SCDefinition = {
  constructor: VoidSCDConstructor,
  functions: [],
  events: [],
};

// below are type definitions for the contart we display in the dropdown
export type SmartContract = {
  name: string;
  contract: string;
};

export type GasEstimates = {
  creation: {
    codeDepositCost: string,
		executionCost: string,
		totalCost: string
  }
  external: {[key: string]: string}
}

export type CompiledContract = {
  name: string;
  abi: [];
  bytecode: string;
  gasEstimates: GasEstimates;
};



export const defaultSmartContracts: SmartContract[] = [
  {
    name: "SimpleStorage",
    contract: `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.13;

    contract SimpleStorage {
      uint public storedData;
      event stored(address _to, uint _amount);
        
      constructor(uint initVal) public {
        emit stored(msg.sender, initVal);
        storedData = initVal;
      }
        
      function set(uint x) public {
        emit stored(msg.sender, x);
        storedData = x;
      }
        
      function get() view public returns (uint retVal) {
        return storedData;
      }
    }
    `,
  },
  {
    name: "DoubleStorage",
    contract: `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.13;

    contract DoubleStorage {
      uint public storedData;
      uint public secondData;
      event stored(address _to, uint _amount);
    
      constructor(uint initVal) public {
        emit stored(msg.sender, initVal);
        storedData = initVal;
        secondData = initVal;
      }
    
      function set(uint x) public {
        emit stored(msg.sender, x);
        storedData = x;
      }
    
      function setSecond(uint x) public { 
        secondData = x;
      }
    
      function get() view public returns (uint retVal) {
        return storedData;
      }
    
      function getSecond() view public returns (uint retVal) {
        return secondData;
      }
    
    }
    
    `,
  },
  {
    name: "Counter",
    contract: `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.13;

    contract Counter {
      uint public count;
  
      function get() public view returns (uint) {
          return count;
      }
  
      function inc() public {
          count += 1;
      }
  
      function dec() public {
        if (count > 0){
          count -= 1;
        }          
      }
    }
    `,
  },
  {
    name: "Array",
    contract: `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.13;
    
    contract Array {
        // Several ways to initialize an array
        uint[] public arr;
        uint[] public arr2 = [1, 2, 3];
        // Fixed sized array, all elements initialize to 0
        uint[10] public myFixedSizeArr;
    
        function get(uint i) public view returns (uint) {
            return arr[i];
        }
    
        // Solidity can return the entire array.
        // But this function should be avoided for
        // arrays that can grow indefinitely in length.
        function getArr() public view returns (uint[] memory) {
            return arr;
        }
    
        function push(uint i) public {
            // Append to array
            // This will increase the array length by 1.
            arr.push(i);
        }
    
        function pop() public {
            // Remove last element from array
            // This will decrease the array length by 1
            arr.pop();
        }
    
        function getLength() public view returns (uint) {
            return arr.length;
        }
    
        function remove(uint index) public {
            // Delete does not change the array length.
            // It resets the value at index to it's default value,
            // in this case 0
            delete arr[index];
        }
    
        function examples() external {
            // create array in memory, only fixed size can be created
            uint[] memory a = new uint[](5);
        }
    }
    `,
  },
  
];

