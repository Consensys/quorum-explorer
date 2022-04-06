export type SmartContract = {
  name: string;
  contract: string;
};

export type CompiledContract = {
  abi: [];
  bytecode: string;
};

export const defaultSmartContracts: SmartContract[] = [
  {
    name: "SimpleStorage",
    contract: `pragma solidity ^0.7.6;
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
