import { ethers } from "ethers";
import { compiledContract } from "../types/Contracts";

export function deployContract(
  rpcUrl: string,
  compiledContract: compiledContract
) {
  const abi = compiledContract.abi;
  const bytecode = compiledContract.bytecode;

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const randomPrivateKey = ethers.Wallet.createRandom();
  const newWallet = new ethers.Wallet(randomPrivateKey, provider);

  console.log(newWallet.address, newWallet.provider, newWallet.publicKey);
}
