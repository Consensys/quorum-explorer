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
  Select,
} from "@chakra-ui/react";
import { faDatabase, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { QuorumConfig } from "../../types/QuorumConfig";
import {
  CompiledContract,
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
  account: string;
  privateFor: string[];
  privateFrom: string;
  fromPrivateKey: string;
  selectLoading: boolean;
  closeAllToasts: () => void;
  reuseToast: any;
  getSetTessera: string[];
  privTxState: boolean;
  contractFunctions: any;
  contractToInteract: any;
  setInteractAddress: any;
  interactAddress: string;
}

export default function ContractsInteract(props: IProps) {
  const [dynamicButtonLoading, setDynamicButtonLoading] =
    useState<buttonLoading>({});
  const [interacting, setInteracting] = useState(false);
  const [transactParams, setTransactParams] = useState<any>({});
  const pogu = getContractFunctions(
    props.compiledContract[
      props.contractToInteract.filter(
        (x: any) => x.deployedAddress === props.interactAddress
      )[0]?.contract
    ]?.abi
  );
  const readFunctions: SCDFunction[] = pogu!.functions.filter(
    (_: any) => _.stateMutability === "view"
  );
  const transactFunctions: SCDFunction[] = pogu!.functions.filter(
    (_: any) => _.stateMutability !== "view"
  );

  useEffect(() => {
    // dirty way to remove from function state if switching contracts
    // const newObj: any = {};
    // const nameMap = Object.values(pogu!.functions).map((x: any) => x.name);
    // Object.keys(transactParams).map((x) => {
    //   nameMap.includes(x) && (newObj[x] = transactParams[x]);
    //   setTransactParams(newObj);
    // });
    setTransactParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.compiledContract]);

  const handleTransactArgs = (e: any, i: any) => {
    console.log(e.target.id);
    const funcName = e.target.id.split("-")[0];
    const paramName = e.target.id.split("-")[1];
    const functionGetter = props.contractFunctions!.functions.filter(
      (_: any) => _.name === funcName
    )[0];
    if (i.type === "bytes") {
      functionGetter.inputs[0].value = ethers.utils.formatBytes32String(
        e.target.value
      );
    } else {
      functionGetter.inputs[0].value = e.target.value;
    }
    const save = Object.assign({}, functionGetter.inputs[0]);
    setTransactParams({
      ...transactParams,
      [`${funcName}`]: {
        ...transactParams[`${funcName}`],
        [`${paramName}`]: save,
      },
    });
  };

  const handleRead = async (e: any) => {
    console.log("Contract READ: " + e.name);
    setDynamicButtonLoading({
      ...dynamicButtonLoading,
      [e.name]: true,
    });
    setInteracting(true);

    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    if (props.interactAddress.length < 1) {
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
        props.interactAddress,
        props.compiledContract[
          props.contractToInteract.filter(
            (x: any) => x.deployedAddress === props.interactAddress
          )[0].contract
        ].abi,
        signer
      );
      let res;
      const funcToCall = e.name;
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
      props.interactAddress.length > 0 &&
      props.getSetTessera !== undefined &&
      props.getSetTessera.length > 0
    ) {
      const funcToCall = e.name;
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
          contractAddress: props.interactAddress,
          compiledContract:
            props.compiledContract[
              props.contractToInteract.filter(
                (x: any) => x.deployedAddress === props.interactAddress
              )[0].contract
            ],
          privateFrom: props.privateFrom,
          privateFor: props.getSetTessera,
          fromPrivateKey: props.fromPrivateKey,
          functionToCall: funcToCall,
          functionArgs:
            typeof transactParams[funcToCall] !== "undefined"
              ? Object.values(transactParams[funcToCall])
              : [],
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
                e.name
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
      [e.name]: false,
    });
    setInteracting(false);
  };

  const handleTransact = async (e: any) => {
    console.log("Contract TRANSACT: " + e.name);
    // console.log(scDefinition);
    const functionToCall = e.name;
    setDynamicButtonLoading({
      ...dynamicButtonLoading,
      [functionToCall]: true,
    });
    setInteracting(true);
    if (props.privTxState && props.interactAddress.length < 1) {
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
        props.interactAddress,
        props.compiledContract[
          props.contractToInteract.filter(
            (x: any) => x.deployedAddress === props.interactAddress
          )[0].contract
        ].abi,
        signer
      );
      const funcToCall = e.name;
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
      props.interactAddress.length > 0 &&
      props.getSetTessera !== undefined &&
      props.getSetTessera.length > 0
    ) {
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
          contractAddress: props.interactAddress,
          compiledContract:
            props.compiledContract[
              props.contractToInteract.filter(
                (x: any) => x.deployedAddress === props.interactAddress
              )[0].contract
            ],
          sender: props.privateFrom,
          privateFor: props.getSetTessera,
          functionToCall: functionToCall,
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
            <FormLabel htmlFor="select-contract">Select Contract</FormLabel>
            <Select
              id="select-contract"
              value={
                props.contractToInteract.filter(
                  (x: any) => x.deployedAddress === props.interactAddress
                )[0]?.contract
              }
              onChange={(e: any) => {
                props.setInteractAddress(
                  props.contractToInteract.filter(
                    (x: any) => x.contract === e.target.value
                  )[0].deployedAddress
                );
              }}
            >
              {props.contractToInteract.map((c: any, i: any) => (
                <option key={i} value={c.contract}>
                  {c.contract}
                </option>
              ))}
            </Select>
            <FormLabel htmlFor="contract-address">Deployed Address</FormLabel>
            <Input
              id="contract-address"
              placeholder="0x"
              value={props.interactAddress}
              onFocus={(e) => e.target.select()}
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
                      colorScheme="blue"
                      onClick={() => handleRead(f)}
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
                        onChange={(e) => handleTransactArgs(e, i)}
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
                        colorScheme="purple"
                        onClick={() => handleTransact(f)}
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
                          onChange={(e) => handleTransactArgs(e, i)}
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
