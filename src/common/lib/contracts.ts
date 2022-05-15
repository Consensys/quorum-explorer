import { SCDefinition, SCDConstructor, SCDFunctionArg, SCDFunction, VoidSCDefinition, VoidSCDConstructor } from "../types/Contracts";


// {internalType: 'uint256', name: 'initVal', type: 'uint256'}
function getConstructor(obj: any){
  var c : SCDConstructor = VoidSCDConstructor;
  if((typeof obj != "undefined") && (obj != [])) {
    c = {
      inputs: obj.inputs.map((_: any) => _ as SCDFunctionArg)
    }
  }
  return c
}

// {inputs: Array(0), name: 'get', outputs: Array(1), stateMutability: 'view', type: 'function'}
function createFunction(obj: any){
  const c : SCDFunction = {
    inputs: obj.inputs.map((_: any) => _ as SCDFunctionArg),
    outputs: obj.outputs.map((_: any) => _ as SCDFunctionArg),
    name: obj.name
  }
  return c;
}

function getFunctions(obj: any){
  return obj.map((_: any) => createFunction(_))
}

export function setFunctionArgValue(fa: SCDFunctionArg[], k: string, v: string|number){
  const input = fa.filter(a => a.name === k)
  input[0].value = v;
}

// {anonymous: false, inputs: Array(2), name: 'stored', type: 'event'}
function createEvent(obj: any){
  const c : SCDFunction = {
    inputs: obj.inputs.map((_: any) => _ as SCDFunctionArg),
    outputs: [],
    name: obj.name
  }
  return c;
}

function getEvents(obj: any){
  return obj.map((_: any) => createEvent(_))
}

export function getContractFunctions(abi: any[]) {
  var contract : SCDefinition = VoidSCDefinition;
  if((typeof abi != "undefined") && (abi != [])) {
    contract = {
      constructor: getConstructor(abi.filter(_ => _.type == "constructor")[0]),
      functions: getFunctions(abi.filter(_ => _.type == "function")),
      events: getEvents(abi.filter(_ => _.type == "event"))
    }
  }
  return contract;
}
