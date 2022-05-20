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
    name: "Counter",
    contract: `
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
    name: "SimpleStorage",
    contract: `
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
    }`,
  },
];

