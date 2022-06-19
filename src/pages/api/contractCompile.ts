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
  let output: any = await compile(req.body.content, req.body.version);
  res.status(200).json(output);
}

async function compile(sourceCode: any, version: string) {
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["*", "evm.bytecode"] } } },
  };
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
  return new Promise((resolve, reject) => {
    // Create the Solidity Compiler Standard Input and Output JSON
    // Use "latest" if you want latest build
    solc.loadRemoteVersion(
      version,
      async function (err: any, solcSnapshot: any) {
        if (err) {
          // An error was encountered, display and quit
          console.error(err);
          reject();
        } else {
          // NOTE: Use `solcSnapshot` here with the same interface `solc` has
          const output = solcSnapshot.compile(JSON.stringify(input));
          const jsonOutput = JSON.parse(output);
          const contractName: string = Object.keys(
            jsonOutput.contracts.main
          )[0];
          const artifact = jsonOutput.contracts.main[contractName];

          const concatABI = Object.values(
            Object.keys(jsonOutput.contracts.main)
              .map((x: any) => jsonOutput.contracts.main[x].abi)
              .flat()
          );

          Object.keys(jsonOutput.contracts.main).map((x: any) => {
            listContracts[x] = {
              name: x,
              abi: jsonOutput.contracts.main[x].abi,
              bytecode: jsonOutput.contracts.main[x].evm.bytecode.object,
              gasEstimates: jsonOutput.contracts.main[x].evm.gasEstimates,
            };
          });
          resolve(listContracts);
        }
      }
    );
  });
}
