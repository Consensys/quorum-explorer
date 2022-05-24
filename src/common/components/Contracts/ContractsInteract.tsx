import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Text,
  Spacer,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import { faDatabase, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { QuorumConfig } from "../../types/QuorumConfig";
import {
  CompiledContract,
  SCDefinition,
  SCDFunction,
  buttonLoading,
} from "../../types/Contracts";
import { getDetailsByNodeName } from "../../lib/quorumConfig";
import { getContractFunctions, prettyPrintToast } from "../../lib/contracts";
import axios from "axios";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ethers } from "ethers";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
interface IProps {
  config: QuorumConfig;
  selectedNode: string;
  compiledContract: CompiledContract;
  contractAddress: string;
  account: string;
  privateFor: string[];
  privateFrom: string;
  fromPrivateKey: string;
  selectLoading: boolean;
  closeAllToasts: () => void;
  reuseToast: any;
  handleContractAddress: (e: any) => void;
  getSetTessera: string[];
  privTxState: boolean;
}

export default function ContractsInteract(props: IProps) {
  const [dynamicButtonLoading, setDynamicButtonLoading] =
    useState<buttonLoading>({});
  const [interacting, setInteracting] = useState(false);
  const [transactParams, setTransactParams] = useState<any>({});
  const scDefinition: SCDefinition = getContractFunctions(
    props.compiledContract.abi
  );
  const readFunctions: SCDFunction[] = scDefinition.functions.filter(
    (_) => _.stateMutability === "view"
  );
  const transactFunctions: SCDFunction[] = scDefinition.functions.filter(
    (_) => _.stateMutability !== "view"
  );

  useEffect(() => {
    // dirty way to remove from function state if switching contracts
    const newObj: any = {};
    Object.keys(transactParams).map((x) => {
      Object.values(scDefinition.functions)
        .map((x) => x.name)
        .includes(x) && (newObj[x] = transactParams[x]);
      setTransactParams(newObj);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.compiledContract]);

  const handleTransactArgs = (e: any) => {
    console.log(e.target.id);
    const funcName = e.target.id.split("-")[0];
    const paramName = e.target.id.split("-")[1];
    const functionGetter = scDefinition.functions.filter(
      (_) => _.name === funcName
    )[0];
    functionGetter.inputs[0].value = e.target.value;
    const save = Object.assign({}, functionGetter.inputs[0]);
    console.log(save);
    setTransactParams({
      ...transactParams,
      [`${funcName}`]: {
        ...transactParams[`${funcName}`],
        [`${paramName}`]: save,
      },
    });
  };

  const handleRead = async (e: any) => {
    e.preventDefault();
    console.log("Contract READ: " + e.target.id);
    console.log(scDefinition);
    setDynamicButtonLoading({
      ...dynamicButtonLoading,
      [e.target.id]: true,
    });
    setInteracting(true);

    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    if (props.contractAddress.length < 1) {
      props.closeAllToasts();
      props.reuseToast({
        title: "Notice",
        description: `No contract has been deployed!`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    if (
      props.privTxState &&
      (props.getSetTessera === undefined || props.getSetTessera.length < 1)
    ) {
      props.closeAllToasts();
      props.reuseToast({
        title: "Notice",
        description: `No Tessera recipients selected`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    if (!props.privTxState) {
      // public contract using ethers
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        props.contractAddress,
        props.compiledContract.abi,
        signer
      );
      const funcToCall = e.target.id;
      let res;
      try {
        if (typeof transactParams[funcToCall] !== "undefined") {
          res = await contract[funcToCall](
            ...Object.values(transactParams[funcToCall]).map(
              (x: any) => x.value
            )
          );
        } else {
          res = await contract[funcToCall]();
        }
        props.closeAllToasts();
        props.reuseToast({
          title: `Call: ${funcToCall}`,
          description: `Result: ${
            res instanceof Array
              ? JSON.stringify(res.map((x) => x.toString()))
              : res.toString()
          }`,
          status: "success",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      } catch (err) {
        props.closeAllToasts();
        props.reuseToast({
          title: `Call: ${funcToCall}`,
          description: `${err}`,
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      }
    }
    if (
      props.privTxState &&
      props.contractAddress.length > 0 &&
      props.getSetTessera !== undefined &&
      props.getSetTessera.length > 0
    ) {
      const funcToCall = e.target.id;
      await axios({
        method: "POST",
        url: `/api/contractRead`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          client: needle.client,
          rpcUrl: needle.rpcUrl,
          privateUrl: needle.privateTxUrl,
          contractAddress: props.contractAddress,
          compiledContract: props.compiledContract,
          privateFrom: props.privateFrom,
          privateFor: props.getSetTessera,
          fromPrivateKey: props.fromPrivateKey,
          functionToCall: funcToCall,
          functionArgs:
            typeof transactParams[funcToCall] !== "undefined"
              ? Object.values(transactParams[funcToCall])
              : undefined,
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((result) => {
          // console.log(result);
          if (result.data === null || result.data === "") {
            props.closeAllToasts();
            props.reuseToast({
              title: "Error",
              description: `${props.selectedNode} may not be a member to the transaction! Or the call failed.`,
              status: "info",
              duration: 5000,
              position: "bottom",
              isClosable: true,
            });
          } else {
            props.closeAllToasts();
            props.reuseToast({
              title: "Read Success!",
              description: `Value from contract function ${
                e.target.id
              }( ): ${prettyPrintToast(result.data)}`,
              status: "success",
              duration: 5000,
              position: "bottom",
              isClosable: true,
            });
          }
        })
        .catch((e) => {
          props.closeAllToasts();
          props.reuseToast({
            title: "Error!",
            description: `There was an error reading from the contract.`,
            status: "error",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          // const joined = logs.concat(
          //   "Error in deploying contract: " + selectedContract
          // );
          // setLogs(joined);
        });
    }
    setDynamicButtonLoading({
      ...dynamicButtonLoading,
      [e.target.id]: false,
    });
    setInteracting(false);
  };

  const handleTransact = async (e: any) => {
    e.preventDefault();
    console.log("Contract TRANSACT: " + e.target.id);
    // console.log(scDefinition);
    const functionToCall = e.target.id;
    setDynamicButtonLoading({
      ...dynamicButtonLoading,
      [functionToCall]: true,
    });
    setInteracting(true);
    if (props.privTxState && props.contractAddress.length < 1) {
      props.closeAllToasts();
      props.reuseToast({
        title: "Notice",
        description: `No contract has been deployed!`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    if (
      props.privTxState &&
      (props.getSetTessera === undefined || props.getSetTessera.length < 1)
    ) {
      props.closeAllToasts();
      props.reuseToast({
        title: "Notice",
        description: `No Tessera recipients selected`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    if (!props.privTxState) {
      // public contract using ethers
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        props.contractAddress,
        props.compiledContract.abi,
        signer
      );
      const funcToCall = e.target.id;
      let res;
      try {
        if (typeof transactParams[funcToCall] !== "undefined") {
          res = await contract[funcToCall](
            ...Object.values(transactParams[funcToCall]).map(
              (x: any) => x.value
            )
          );
        } else {
          res = await contract[funcToCall]();
        }
        props.closeAllToasts();
        props.reuseToast({
          title: `Call: ${funcToCall}`,
          description: `Result: ${res.hash}`,
          status: "success",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
        const waiting = await res.wait();
        props.closeAllToasts();
        props.reuseToast({
          title: `Call Successful: ${funcToCall}`,
          description: `Validated in block: ${waiting.blockNumber}`,
          status: "success",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      } catch (err) {
        props.closeAllToasts();
        props.reuseToast({
          title: `Call: ${funcToCall}`,
          description: `${err}`,
          status: "success",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      }
    }
    if (
      props.privTxState &&
      props.contractAddress.length > 0 &&
      props.getSetTessera !== undefined &&
      props.getSetTessera.length > 0
    ) {
      // const params = transactFunctions.filter((_) => _.name === functionToCall);
      const needle = getDetailsByNodeName(props.config, props.selectedNode);
      await axios({
        method: "POST",
        url: `/api/contractSet`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          client: needle.client,
          rpcUrl: needle.rpcUrl,
          privateUrl: needle.privateTxUrl,
          fromPrivateKey: props.fromPrivateKey,
          contractAddress: props.contractAddress,
          compiledContract: props.compiledContract,
          sender: props.privateFrom,
          privateFor: props.getSetTessera,
          functionToCall: functionToCall,
          // functionArgs: params[0].inputs,
          functionArgs:
            typeof transactParams[functionToCall] !== "undefined"
              ? Object.values(transactParams[functionToCall])
              : [],
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((result) => {
          // console.log(result);
          props.closeAllToasts();
          props.reuseToast({
            title: "Success!",
            description: `Contract function called successfully.`,
            status: "success",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
        })
        .catch((err) => {
          props.closeAllToasts();
          props.reuseToast({
            title: "Error!",
            description: `${err}`,
            status: "error",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
        });
    }
    setDynamicButtonLoading({
      ...dynamicButtonLoading,
      [functionToCall]: false,
    });
    setInteracting(false);
  };

  return (
    <>
      <AccordionItem>
        <AccordionButton>
          <Box color="purple.400" fontWeight="bold" flex="1" textAlign="left">
            3. Interact
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <FormControl>
            <FormLabel htmlFor="contract-address">
              Deployed Contract Address
            </FormLabel>
            <Input
              id="contract-address"
              placeholder="0x"
              value={props.contractAddress}
              onChange={props.handleContractAddress}
              readOnly
            />
          </FormControl>
          <VStack spacing={2} align="stretch" mt={1}>
            {readFunctions
              .filter((_) => _.inputs.filter((x) => x.name === "").length === 0)
              .map((f, i) => (
                <Box
                  key={i}
                  borderRadius="lg"
                  borderWidth={2}
                  boxShadow="md"
                  p={5}
                >
                  <HStack align="stretch">
                    <Center>
                      <Text fontSize="md">{f.name}</Text>
                    </Center>
                    <Spacer />
                    <Button
                      id={f.name}
                      leftIcon={
                        <FontAwesomeIcon icon={faDatabase as IconProp} />
                      }
                      type="submit"
                      colorScheme="blue"
                      onClick={handleRead}
                      variant="solid"
                      minW={125}
                      isLoading={dynamicButtonLoading[f.name]}
                      isDisabled={interacting}
                    >
                      Call
                    </Button>
                  </HStack>
                  {f.inputs.map((i) => (
                    <>
                      <Text
                        fontSize="sm"
                        as="i"
                      >{`${i.name} (${i.type})`}</Text>
                      <Input
                        key={`${f.name}-${i.name}`}
                        id={`${f.name}-${i.name}`}
                        placeholder={i.value}
                        onChange={handleTransactArgs}
                      />
                    </>
                  ))}
                </Box>
              ))}
          </VStack>
          <VStack spacing={2} align="stretch" mt={1}>
            {transactFunctions
              .filter((_) => _.inputs.filter((x) => x.name === "").length === 0)
              .map((f, i) => (
                <VStack key={i} align="stretch">
                  <Box borderRadius="lg" borderWidth={2} boxShadow="md" p={5}>
                    <HStack>
                      <Text fontSize="md">{f.name}</Text>
                      <Spacer />
                      <Button
                        id={f.name}
                        leftIcon={
                          <FontAwesomeIcon icon={faPencilAlt as IconProp} />
                        }
                        type="submit"
                        colorScheme="purple"
                        onClick={handleTransact}
                        variant="solid"
                        minW={125}
                        isLoading={dynamicButtonLoading[f.name]}
                        isDisabled={interacting}
                      >
                        Transact
                      </Button>
                    </HStack>

                    {f.inputs.map((i) => (
                      <>
                        <Text
                          fontSize="sm"
                          as="i"
                        >{`${i.name} (${i.type})`}</Text>
                        <Input
                          key={`${f.name}-${i.name}`}
                          id={`${f.name}-${i.name}`}
                          placeholder={i.value}
                          onChange={handleTransactArgs}
                        />
                      </>
                    ))}
                  </Box>
                </VStack>
              ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
