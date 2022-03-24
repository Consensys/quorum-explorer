import { ethers } from "ethers";
import { compiledContract } from "../types/Contracts";

export async function deployContract(
  rpcUrl: string,
  compiledContract: compiledContract,
  deployArgs: any
) {
  const abi = compiledContract.abi;
  const bytecode = compiledContract.bytecode;

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const randomPrivateKey = await ethers.Wallet.createRandom();
  const newWallet = new ethers.Wallet(randomPrivateKey, provider);
  console.log(newWallet.address, newWallet.provider, newWallet.publicKey);

  try {
    const factory = new ethers.ContractFactory(abi, bytecode, newWallet);
    const contract = await factory.deploy(deployArgs); // If contract has deploy args put in function
    return contract;
  } catch (e) {
    console.log(e);
    return 1;
  }
}
