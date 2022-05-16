import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
//@ts-ignore
import solc from "solc";
import { CompiledContract } from "../../common/types/Contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompiledContract>
) {
  console.log(req.body.name, req.body.content);
  const session = await getSession({ req });
  if (!session) {
    /// Not Signed in
    res.status(401).end();
    return;
  }
  let output = compile(req.body.content, req.body.name);
  res.status(200).json(output);
}

function compile(sourceCode: any, contractName: string) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["*", "evm.bytecode"] } } },
  };
  // Parse the compiler output to retrieve the ABI and bytecode
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}
