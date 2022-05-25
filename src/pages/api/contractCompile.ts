import { GasEstimates } from "./../../common/types/Contracts";
import type { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import solc from "solc";
import apiAuth from "../../common/lib/authentication";
import { CompiledContract } from "../../common/types/Contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompiledContract>
) {
  const checkSession = await apiAuth(req, res);
  if (!checkSession) {
    return;
  }
  // console.log(req.body);
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

  const concatABI = Object.values(
    Object.keys(jsonOutput.contracts.main)
      .map((x: any) => jsonOutput.contracts.main[x].abi)
      .flat()
  );

  const listContracts = <
    {
      [key: string]: {
        name: string;
        abi: any[];
        bytecode: string;
        gasEstimates: any;
      };
    }
  >{};
  Object.keys(jsonOutput.contracts.main).map((x: any) => {
    listContracts[x] = {
      name: x,
      abi: jsonOutput.contracts.main[x].abi,
      bytecode: jsonOutput.contracts.main[x].evm.bytecode.object,
      gasEstimates: jsonOutput.contracts.main[x].evm.gasEstimates,
    };
  });

  return listContracts;
}
