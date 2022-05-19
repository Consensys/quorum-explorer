import type { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import solc from "solc";
import { CompiledContract } from "../../common/types/Contracts";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompiledContract>
) {
  console.log(req.body);
  let output = compile(req.body.content);
  res.status(200).json(output);
}

function compile(sourceCode: any) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["*", "evm.bytecode"] } } },
  };
  // Parse the compiler output to retrieve the ABI and bytecode
  const output = solc.compile(JSON.stringify(input));
  const jsonOutput = JSON.parse(output);
  const contractName: string = Object.keys(jsonOutput.contracts.main)[0];
  const artifact = jsonOutput.contracts.main[contractName];

  return {
    name: contractName,
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}
