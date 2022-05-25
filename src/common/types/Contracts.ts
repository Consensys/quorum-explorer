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
  stateMutability: string;
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
    codeDepositCost: string;
    executionCost: string;
    totalCost: string;
  };
  external: { [key: string]: string };
};

export type CompiledContract = {
  name: string;
  abi: [];
  bytecode: string;
  gasEstimates: GasEstimates;
};

export const defaultSmartContracts: SmartContract[] = [
  {
    name: "SimpleStorage",
    contract: `// SPDX-License-Identifier: MIT
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
    name: "MultiArgConstructor",
    contract: `// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.13;

    contract MultiArgConstructor {
      uint public storedData;
      uint public secondData;
      event stored(address _to, uint _amount);
    
      constructor(uint initVal, uint initValB) public {
        emit stored(msg.sender, initVal);
        storedData = initVal;
        secondData = initValB;
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
    contract: `// SPDX-License-Identifier: MIT
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
    contract: `// SPDX-License-Identifier: MIT
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
  {
    name: "MultiSigWallet",
    contract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MultiSigWallet {
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    constructor(address[] memory _owners, uint _numConfirmationsRequired) {
        require(_owners.length > 0, "owners required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to,
        uint _value,
        bytes memory _data
    ) public onlyOwner {
        uint txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(uint _txIndex)
        public
        view
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}

    `,
  },
];
