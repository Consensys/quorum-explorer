import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  StackDivider,
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
import {
  getContractFunctions,
  setFunctionInputsArgValue,
} from "../../lib/contracts";
import axios from "axios";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
}

export default function ContractsInteract(props: IProps) {
  const [dynamicButtonLoading, setDynamicButtonLoading] =
    useState<buttonLoading>({});
  const [interacting, setInteracting] = useState(false);
  const scDefinition: SCDefinition = getContractFunctions(
    props.compiledContract.abi
  );
  const readFunctions: SCDFunction[] = scDefinition.functions.filter(
    (_) => _.inputs.length === 0
  );
  const transactFunctions: SCDFunction[] = scDefinition.functions.filter(
    (_) => _.inputs.length > 0
  );

  const handleRead = async (e: any) => {
    e.preventDefault();
    console.log("Contract READ: " + e.target.id);
    // console.log(scDefinition);
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
    if (props.getSetTessera === undefined || props.getSetTessera.length < 1) {
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
    if (
      props.contractAddress.length > 0 &&
      props.getSetTessera !== undefined &&
      props.getSetTessera.length > 0
    ) {
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
          functionToCall: e.target.id,
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((result) => {
          // console.log(result);
          if (result.data === null || result.data === "") {
            props.closeAllToasts();
            props.reuseToast({
              title: "Not a Party!",
              description: `${props.selectedNode} is not a member to the transaction!`,
              status: "info",
              duration: 5000,
              position: "bottom",
              isClosable: true,
            });
          } else {
            props.closeAllToasts();
            props.reuseToast({
              title: "Read Success!",
              description: `Value from contract function ${e.target.id}( ): ${result.data}`,
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

  const handleTransactArgs = (e: any) => {
    const funcName = e.target.id.split("-")[0];
    const paramName = e.target.id.split("-")[1];
    setFunctionInputsArgValue(
      scDefinition.functions,
      funcName,
      paramName,
      e.target.value
    );
    console.log(scDefinition.functions);
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
    const params = transactFunctions.filter((_) => _.name === functionToCall);
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
    if (props.getSetTessera === undefined || props.getSetTessera.length < 1) {
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
    if (
      props.contractAddress.length > 0 &&
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
          contractAddress: props.contractAddress,
          compiledContract: props.compiledContract,
          sender: props.privateFrom,
          privateFor: props.getSetTessera,
          functionToCall: functionToCall,
          functionArgs: params[0].inputs,
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((result) => {
          // console.log(result);
          props.closeAllToasts();
          props.reuseToast({
            title: "Success!",
            description: `Contract set function called successfully.`,
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
          <VStack
            spacing={2}
            align="stretch"
            divider={<StackDivider borderColor="gray.200" />}
            mt={1}
          >
            {readFunctions.map((f, i) => (
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
                    leftIcon={<FontAwesomeIcon icon={faDatabase as IconProp} />}
                    type="submit"
                    colorScheme="blue"
                    onClick={handleRead}
                    variant="solid"
                    minW={125}
                    isLoading={dynamicButtonLoading[f.name]}
                    isDisabled={interacting}
                  >
                    Read
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
          <VStack
            spacing={2}
            align="stretch"
            divider={<StackDivider borderColor="gray.200" />}
            mt={1}
          >
            {transactFunctions.map((f, i) => (
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
