// import { CompiledContract } from "../types/Contracts";
// import Web3 from "web3";
// //@ts-ignore
// import Web3Quorum from "web3js-quorum";
// import axios from "axios";

// export async function deployContract(
//   client: string,
//   rpcUrl: string,
//   privateUrl: string,
//   accountPrivateKey: string,
//   privateForList: string[],
//   compiledContract: compiledContract,
//   deployArgs: any
// ) {
//   const abi = compiledContract.abi;
//   const bytecode = compiledContract.bytecode;

//   const web3 = new Web3(rpcUrl);
//   const web3quorum = new Web3Quorum(
//     web3,
//     { privateUrl: privateUrl },
//     client === "goquorum"
//   );

//   const account = web3.eth.accounts.privateKeyToAccount(accountPrivateKey);
//   const txCount = await web3.eth.getTransactionCount(account.address);
//   const chainId = await web3.eth.getChainId();
//   const fromTxPublicKey = await axios
//     .get(privateUrl + "/keys", {
//       headers: { "Content-Type": "application/json" },
//     })
//     .then((res) => res.data.keys[0].key);

//   const txOptions = {
//     chainId,
//     nonce: txCount,
//     gasPrice: 0, //ETH per unit of gas
//     gasLimit: 0x24a22, //max number of gas units the tx is allowed to use
//     value: 0,
//     data: deployArgs,
//     from: account,
//     isPrivate: true,
//     privateKey: accountPrivateKey,
//     privateFrom: fromTxPublicKey,
//     privateFor: privateForList,
//   };
//   console.log("Creating contract...");

//   // Generate and send the Raw transaction to the Besu node using the eea_sendRawTransaction JSON-RPC call
//   const txHash = await web3quorum.priv.generateAndSendRawTransaction(txOptions);
//   console.log("Getting contractAddress from txHash: ", txHash);
//   return txHash;
// }

// export async function getValueAtAddress(
//   client: string,
//   rpcUrl: string,
//   privateUrl: string,
//   contractAddress: string,
//   compiledContract: compiledContract,
// ) {
//   const abi = compiledContract.abi;
//   const web3 = new Web3(rpcUrl);
//   const web3quorum = new Web3Quorum(
//     web3,
//     { privateUrl: privateUrl },
//     client === "goquorum"
//   );
//   const contractInstance = new web3.eth.Contract(abi, contractAddress);
//   const res = await contractInstance.methods.get().call().catch(() => {});
//   console.log("obtained value at deployed contract is: "+ res);
//   return res;
// }


// const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
// const randomPrivateKey = await ethers.Wallet.createRandom();
// const newWallet = new ethers.Wallet(randomPrivateKey, provider);
// console.log(newWallet.address, newWallet.provider, newWallet.publicKey);

// try {
//   const factory = new ethers.ContractFactory(abi, bytecode, newWallet);
//   const contract = await factory.deploy(deployArgs); // If contract has deploy args put in function
//   return contract;
// } catch (e) {
//   console.log(e);
//   return 1;
// }
