import {
  SCDefinition,
  SCDConstructor,
  SCDFunctionArg,
  SCDFunction,
  VoidSCDefinition,
  VoidSCDConstructor,
} from "../types/Contracts";

export function prettyPrintToast(i: any) {
  return typeof i === "object" ? JSON.stringify(i) : i;
}

export function getDefaultValue(t: string) {
  if (typeof t == "string") {
    if (t.startsWith("int") || t.startsWith("uint")) {
      return 0 as number;
    } else if (t.startsWith("bool")) {
      return false as Boolean;
    } else if (t == "address") {
      return "0x0000000000000000000000000000000000000000";
    } else if (t == "bytes") {
      return "bytes";
    } else if (t.includes("[")) {
      return "[]";
      return "";
    }
  }
}
// {internalType: 'uint256', name: 'initVal', type: 'uint256'}
function getConstructor(obj: any) {
  var c: SCDConstructor = VoidSCDConstructor;
  if (typeof obj != "undefined" && obj != []) {
    c = {
      inputs: obj.inputs.map((_: any) => _ as SCDFunctionArg),
    };
    c.inputs.map((_) => (_.value = getDefaultValue(_.type as string)));
  }
  return c;
}

// {inputs: Array(0), name: 'get', outputs: Array(1), stateMutability: 'view', type: 'function'}
function createFunction(obj: any) {
  const c: SCDFunction = {
    inputs: obj.inputs.map((_: any) => _ as SCDFunctionArg),
    outputs: obj.outputs.map((_: any) => _ as SCDFunctionArg),
    stateMutability: obj.stateMutability,
    name: obj.name,
  };
  c.inputs.map((_) => (_.value = getDefaultValue(_.type)));
  c.outputs.map((_) => (_.value = getDefaultValue(_.type)));
  return c;
}

function getFunctions(obj: any) {
  return obj.map((_: any) => createFunction(_));
}

export function setFunctionArgValue(fa: SCDFunctionArg[], k: string, v: any) {
  const input = fa.filter((a) => a.name === k);
  if (input.length > 0) {
    input[0].value = v;
  }
}

export function setFunctionInputsArgValue(
  f: SCDFunction[],
  funcName: string,
  paramName: string,
  v: any
) {
  f.map((_) => {
    if (_.name == funcName) {
      setFunctionArgValue(_.inputs, paramName, v);
    }
  });
}

// {anonymous: false, inputs: Array(2), name: 'stored', type: 'event'}
function createEvent(obj: any) {
  const c: SCDFunction = {
    inputs: obj.inputs.map((_: any) => _ as SCDFunctionArg),
    outputs: [],
    stateMutability: obj.stateMutability,
    name: obj.name,
  };
  return c;
}

function getEvents(obj: any) {
  return obj.map((_: any) => createEvent(_));
}

export function getContractFunctions(abi: any[]) {
  var contract: SCDefinition = VoidSCDefinition;
  if (typeof abi != "undefined" && abi != []) {
    contract = {
      constructor: getConstructor(
        abi.filter((_) => _.type == "constructor")[0]
      ),
      functions: getFunctions(abi.filter((_) => _.type == "function")),
      events: getEvents(abi.filter((_) => _.type == "event")),
    };
  }
  return contract;
}
