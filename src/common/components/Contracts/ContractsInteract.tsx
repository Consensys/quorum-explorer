import { Dispatch, useState } from "react";
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
  Flex,
  Text,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,VStack
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";
import { faDatabase, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { QuorumConfig } from "../../types/QuorumConfig";
import { CompiledContract, SCDefinition, SCDFunction } from "../../types/Contracts";
import { getDetailsByNodeName } from "../../lib/quorumConfig";
import { getContractFunctions, setFunctionArgValue, setFunctionInputsArgValue } from "../../lib/contracts"
import axios from "axios";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
  compiledContract: CompiledContract;
  contractAddress: string;
  account: string;
  privateFor: string[];
  privateFrom: string;
  fromPrivateKey: string;
  tesseraKeys: { label: string; value: string }[] | undefined;
  selectLoading: boolean;
  closeAllToasts: () => void;
  reuseToast: any;
  handleContractAddress: (e: any) => void;
}

export default function ContractsInteract(props: IProps) {
  const [readButtonLoading, setReadButtonLoading] = useState(false);
  const [writeValue, setWriteValue] = useState("0");
  const [writeButtonLoading, setWriteButtonLoading] = useState(false);
  const [getSetTessera, setGetSetTessera] = useState<string[]>();
  const scDefinition : SCDefinition = getContractFunctions(props.compiledContract.abi);
  const readFunctions: SCDFunction[] = scDefinition.functions.filter(_ => _.inputs.length === 0);
  const transactFunctions: SCDFunction[] = scDefinition.functions.filter(_ => _.inputs.length > 0);
  
  const handleWriteValue = (e: any) => {
    setWriteValue(e);
  };

  const handleRead = async (e: any) => {
    e.preventDefault();
    console.log("EEEE")
    console.log(e)
    console.log("EEEE")

    setReadButtonLoading(true);
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
    if (getSetTessera === undefined || getSetTessera.length < 1) {
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
      getSetTessera !== undefined &&
      getSetTessera.length > 0
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
          privateFor: getSetTessera,
          fromPrivateKey: props.fromPrivateKey,
          functionToCall: e.target.id
        }),
        baseURL: `${process.env.NEXT_PUBLIC_QE_BASEPATH}`,
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
    setReadButtonLoading(false);
  };

  // const handleWrite = async (e: any) => {
  //   e.preventDefault();
  //   setWriteButtonLoading(true);
  //   if (props.contractAddress.length < 1) {
  //     props.closeAllToasts();
  //     props.reuseToast({
  //       title: "Notice",
  //       description: `No contract has been deployed!`,
  //       status: "warning",
  //       duration: 5000,
  //       position: "bottom",
  //       isClosable: true,
  //     });
  //   }
  //   if (getSetTessera === undefined || getSetTessera.length < 1) {
  //     props.closeAllToasts();
  //     props.reuseToast({
  //       title: "Notice",
  //       description: `No Tessera recipients selected`,
  //       status: "warning",
  //       duration: 5000,
  //       position: "bottom",
  //       isClosable: true,
  //     });
  //   }
  //   if (
  //     props.contractAddress.length > 0 &&
  //     getSetTessera !== undefined &&
  //     getSetTessera.length > 0
  //   ) {
  //     const needle = getDetailsByNodeName(props.config, props.selectedNode);
  //     await axios({
  //       method: "POST",
  //       url: `/api/contractSet`,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: JSON.stringify({
  //         client: needle.client,
  //         rpcUrl: needle.rpcUrl,
  //         privateUrl: needle.privateTxUrl,
  //         value: parseInt(writeValue),
  //         fromPrivateKey: props.fromPrivateKey,
  //         contractAddress: props.contractAddress,
  //         compiledContract: props.compiledContract,
  //         sender: props.privateFrom,
  //         privateFor: getSetTessera,
  //       }),
  //       baseURL: `${process.env.NEXT_PUBLIC_QE_BASEPATH}`,
  //     })
  //       .then((result) => {
  //         // console.log(result);
  //         props.closeAllToasts();
  //         props.reuseToast({
  //           title: "Success!",
  //           description: `Contract set function called successfully.`,
  //           status: "success",
  //           duration: 5000,
  //           position: "bottom",
  //           isClosable: true,
  //         });
  //       })
  //       .catch((err) => {
  //         props.closeAllToasts();
  //         props.reuseToast({
  //           title: "Error!",
  //           description: `${err}`,
  //           status: "error",
  //           duration: 5000,
  //           position: "bottom",
  //           isClosable: true,
  //         });
  //       });
  //   }
  //   setWriteButtonLoading(false);
  // };

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
              isDisabled
            />
          </FormControl>
          <Box mt={1}>
            <MultiSelect
              isLoading={props.selectLoading}
              instanceId="private-for-deploy"
              isMulti
              options={props.tesseraKeys}
              onChange={(e) => {
                const myList: string[] = [];
                e.map((k) => myList.push(k.value));
                setGetSetTessera(myList);
              }}
              placeholder="Select Tessera node recipients to use the functions below..."
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              // menuPortalTarget={document.body}
              // styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Box>

          <Flex justifyContent="space-between" alignItems="center" m={1}>
            <VStack 
            spacing={5} 
            align='stretch'
            divider={<StackDivider borderColor='gray.200' />}
            >
            <>
            {readFunctions.map((f) => (
              <HStack spacing={20} p={2} align='stretch'>
              <Text fontSize='md'>{f.name}</Text>
              <Spacer />
              <Button
                id={f.name}
                leftIcon={<FontAwesomeIcon icon={faDatabase as IconProp} />}
                type="submit"
                colorScheme="yellow"
                onClick={handleRead}
                variant="solid"
                minW={125}
              >
                Read
              </Button>
              </HStack>

            ))} 
            </>

            </VStack>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" m={1}>
            <FormLabel htmlFor="set" fontWeight="semibold" m={0} mr={5}>
              set
            </FormLabel>
            <HStack spacing={5}>
              <NumberInput
                min={0}
                maxW={100}
                size="sm"
                defaultValue={writeValue}
                onChange={handleWriteValue}
                allowMouseWheel
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                leftIcon={<FontAwesomeIcon icon={faPencilAlt as IconProp} />}
                minW={125}
                type="submit"
                // backgroundColor="green.200"
                colorScheme="green"
                isLoading={writeButtonLoading}
                // onClick={handleWrite}
                loadingText=""
                variant="solid"
                ml={5}
              >
                Transact
              </Button>
            </HStack>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
