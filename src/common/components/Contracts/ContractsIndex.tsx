import { useEffect, useState } from "react";
import { QuorumConfig } from "../../types/QuorumConfig";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  chakra,
  FormControl,
  FormLabel,
  Button,
  useToast,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Code,
  Tr,
  Th,
  Td,
  TableCaption,
  VStack,
  Divider,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket,
  faCode,
  faStream,
  faPaperPlane,
  faQuestionCircle,
  faHammer,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  SmartContract,
  defaultSmartContracts,
  CompiledContract,
} from "../../types/Contracts";
import axios from "axios";
//@ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  getDetailsByNodeName,
  getPrivateKey,
  getMemberList,
} from "../../api/quorumConfig";
import { Select as MultiSelect } from "chakra-react-select";
import ContractsInteract from "./ContractsInteract";

const MotionGrid = motion(SimpleGrid);
const ChakraCode = chakra(SyntaxHighlighter);

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
}

export default function ContractsIndex(props: IProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const contracts: SmartContract[] = defaultSmartContracts;
  const toast = useToast();
  const [code, setCode] = useState(contracts[0].contract);
  const [compiledContract, setCompiledContract] = useState<CompiledContract>({
    abi: [],
    bytecode: "",
  });
  const [deployedAddress, setDeployedAddress] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [selectedContract, setSelectedContract] = useState(contracts[0].name);
  const [logs, setLogs] = useState<string[]>([]);
  const [tesseraKeys, setTesseraKeys] =
    useState<{ label: string; value: string }[]>();
  const [currentTesseraPublicKey, setCurrentTesseraPublicKey] = useState("");
  const [deployParams, setDeployParams] = useState<{
    privateKeyFrom: string;
    privateFor: string[];
  }>({
    privateKeyFrom: "",
    privateFor: [],
  });
  const controller = new AbortController();
  const [simpleStorageValue, setSimpleStorageValue] = useState(0);
  const [buttonLoading, setButtonLoading] = useState({
    Compile: { status: false, isDisabled: false },
    Deploy: { status: false, isDisabled: true },
  });
  const [selectLoading, setSelectLoading] = useState(true);

  // Set accountAddress if is a member
  useEffect(() => {
    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    if (needle.accountAddress !== undefined) {
      setAccountAddress(needle.accountAddress);
      setDeployParams({
        ...deployParams,
        privateKeyFrom: getPrivateKey(props.config, needle.accountAddress)
          .privateKey,
      });
    } else {
      setAccountAddress("");
      setDeployParams({ ...deployParams, privateKeyFrom: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.config, props.selectedNode]);

  useEffect(() => {
    setSelectLoading(true);
    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    if (needle.privateTxUrl == "") {
      setCurrentTesseraPublicKey("");
      return;
    }
    const fetchData = async () => {
      const returnRes = await axios({
        method: "POST",
        url: "/api/getTesseraKeys",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ config: props.config }),
        signal: controller.signal,
      })
        .then((res) => {
          setCurrentTesseraPublicKey(
            res.data.filter((_: any) => _.label === props.selectedNode)[0][
              "options"
            ][0]["value"]
          );
          setTesseraKeys(res.data);
          setSelectLoading(false);
        })
        .catch(console.error);
      return returnRes;
    };
    fetchData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedNode]);

  const handleContractAddress = (e: any) => {
    setDeployedAddress(e.target.value);
  };

  function closeAll() {
    // you may optionally pass an object of positions to exclusively close
    // keeping other positions opened
    // e.g. `{ positions: ['bottom'] }`
    toast.closeAll();
  }

  const setStorageValue = (e: any) => {
    setSimpleStorageValue(e.target.value);
  };

  const ContractCodeHandler = (e: any) => {
    e.preventDefault();
    const needle: SmartContract = contracts.filter(
      (_) => _.name === e.target.value
    )[0];
    const joined = logs.concat("Navigated to: " + e.target.value);
    setLogs(joined);
    setButtonLoading({
      ...buttonLoading,
      Deploy: { status: false, isDisabled: true },
    });
    setSelectedContract(e.target.value);
    setCode(needle.contract);
  };

  const HandleCompile = async (e: any) => {
    e.preventDefault();
    setButtonLoading({
      ...buttonLoading,
      Compile: { status: true, isDisabled: false },
    });

    axios({
      method: "POST",
      url: "/api/contractCompile",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ name: selectedContract, content: code }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
          console.log(response.data);
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
          setCompiledContract({
            abi: response.data.abi,
            bytecode: response.data.bytecode,
          });
          closeAll();
          toast({
            title: "Compiled Contract!",
            description: `The contract was successfully compiled. Please check the compiled code tab for details `,
            status: "success",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          const joined = logs.concat("Compiled contract: " + selectedContract);
          setLogs(joined);
        } else {
          closeAll();
          toast({
            title: "Contract Compilation Failed",
            description: `Issue encountered compiling contract!`,
            status: "error",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          const joined = logs.concat(
            "Compilation failed on contract: " + selectedContract
          );
          setLogs(joined);
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Backend API Error",
          description: `Issue encountered contacting back-end!`,
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
        const joined = logs.concat(
          "Failed to connect to back-end to compile contract: " +
            selectedContract
        );
        setLogs(joined);
      });

    setButtonLoading({
      Deploy: { status: false, isDisabled: false },
      Compile: { status: false, isDisabled: false },
    });
  };

  const HandleDeploy = async (e: any) => {
    e.preventDefault();
    setButtonLoading({
      ...buttonLoading,
      Deploy: { status: true, isDisabled: false },
    });
    if (
      accountAddress.length === 0 ||
      deployParams.privateFor.length === 0 ||
      deployParams.privateKeyFrom.length === 0
    ) {
      // check if nothing has been selected for account
      closeAll();
      toast({
        title: "Missing Details",
        description: `You must choose account to deploy and private for.`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      setButtonLoading({
        ...buttonLoading,
        Deploy: { status: false, isDisabled: false },
      });
      return;
    }
    if (
      accountAddress.length > 0 &&
      deployParams.privateFor.length > 0 &&
      deployParams.privateKeyFrom.length > 0 &&
      simpleStorageValue !== undefined
    ) {
      // go ahead if all necessary parameters selected
      const getAccountPrivKey = getPrivateKey(
        props.config,
        accountAddress
      ).privateKey;
      const needle = getDetailsByNodeName(props.config, props.selectedNode);
      await axios({
        method: "POST",
        url: "/api/contractDeploy",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          client: needle.client,
          rpcUrl: needle.rpcUrl,
          privateUrl: needle.privateTxUrl,
          accountPrivateKey: getAccountPrivKey,
          privateForList: deployParams.privateFor,
          compiledContract: compiledContract,
          deployArgs: simpleStorageValue,
        }),
      })
        .then((result) => {
          closeAll();
          toast({
            title: "Deployed Contract!",
            description: `The contract was successfully deployed through ${props.selectedNode} @ address: ${result.data.contractAddress}`,
            status: "success",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          setDeployedAddress(result.data.contractAddress);
          const joined = logs.concat(
            "Contract: " +
              selectedContract +
              "\n \n" +
              "Address: " +
              result.data.contractAddress
          );
          setLogs(joined);
        })
        .catch((e) => {
          closeAll();
          toast({
            title: "Error!",
            description: `There was an error deploying the contract.`,
            status: "error",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          const joined = logs.concat(
            "Error in deploying contract: " + selectedContract
          );
          setLogs(joined);
        });

      setButtonLoading({
        ...buttonLoading,
        Deploy: { status: false, isDisabled: false },
      });
    }
  };
  return (
    <>
      <MotionGrid
        columns={2}
        minChildWidth="400px"
        spacing={5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* code and button  */}
        <Box mt={5}>
          <Select
            mb={8}
            size="sm"
            variant="filled"
            onChange={ContractCodeHandler}
          >
            {contracts.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
          <Box mb={10}>
            <ChakraCode
              borderRadius="lg"
              borderWidth={2}
              boxShadow="2xl"
              language="solidity"
              maxH="550px"
              showLineNumbers={false}
              wrapLongLines={true}
            >
              {code}
            </ChakraCode>
          </Box>
          <Button
            leftIcon={<FontAwesomeIcon icon={faHammer as IconProp} />}
            isLoading={buttonLoading.Compile.status}
            isDisabled={buttonLoading.Compile.isDisabled}
            loadingText="Compiling..."
            type="submit"
            variant="solid"
            backgroundColor="orange.200"
            onClick={HandleCompile}
            mr={2}
          >
            Compile
          </Button>
          <Button
            leftIcon={<FontAwesomeIcon icon={faRocket as IconProp} />}
            isLoading={buttonLoading.Deploy.status}
            isDisabled={buttonLoading.Deploy.isDisabled}
            loadingText="Deploying..."
            type="submit"
            variant="solid"
            backgroundColor="green.200"
            onClick={HandleDeploy}
          >
            Deploy
          </Button>
        </Box>

        {/* tabs  */}
        <Box>
          <Tabs mt={5} isFitted isLazy variant="enclosed">
            <TabList mb="1em">
              <Tab>
                <FontAwesomeIcon icon={faPaperPlane as IconProp} />
              </Tab>
              <Tab>
                <FontAwesomeIcon icon={faCode as IconProp} />
              </Tab>
              <Tab>
                <FontAwesomeIcon icon={faStream as IconProp} />
              </Tab>
              <Tab>
                <FontAwesomeIcon icon={faQuestionCircle as IconProp} />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={2} minChildWidth="400px" spacing="40px">
                  <Accordion allowMultiple defaultIndex={[0, 1, 2]}>
                    <AccordionItem>
                      <AccordionButton>
                        <Box
                          color="blue.600"
                          fontWeight="bold"
                          flex="1"
                          textAlign="left"
                        >
                          1. Account to Deploy
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <FormControl>
                          <FormLabel htmlFor="predefined-account">
                            Account
                          </FormLabel>
                          <Input
                            id="predefined-account"
                            variant="filled"
                            placeholder="Node is not a Member"
                            value={accountAddress}
                            isDisabled
                          />
                          <FormLabel htmlFor="private-from">
                            PrivateKey From
                          </FormLabel>
                          <Input
                            id="private-from"
                            variant="filled"
                            placeholder="0x"
                            value={deployParams.privateKeyFrom}
                            isDisabled
                          />
                          <FormLabel htmlFor="tessera-key">
                            Tessera Public Key
                          </FormLabel>
                          <Input
                            id="predefined-tessera-key"
                            variant="filled"
                            placeholder="Node is not a Member"
                            value={currentTesseraPublicKey}
                            isDisabled
                          />
                        </FormControl>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionButton>
                        <Box
                          color="red.400"
                          fontWeight="bold"
                          flex="1"
                          textAlign="left"
                        >
                          2. Deploy
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <FormControl>
                          <FormLabel htmlFor="private-for">
                            Private For
                          </FormLabel>
                          <MultiSelect
                            isLoading={selectLoading}
                            instanceId="private-for"
                            isMulti
                            options={tesseraKeys}
                            onChange={(e) => {
                              const myList: string[] = [];
                              e.map((k) => myList.push(k.value));
                              setDeployParams({
                                ...deployParams,
                                privateFor: myList,
                              });
                            }}
                            placeholder="Select Tessera node..."
                            closeMenuOnSelect={false}
                            selectedOptionStyle="check"
                            hideSelectedOptions={false}
                          />
                          <FormLabel htmlFor="storage-value">
                            Initial Storage Value
                          </FormLabel>
                          <Input
                            id="storage-value"
                            placeholder={simpleStorageValue.toString()}
                            onChange={setStorageValue}
                          />
                        </FormControl>
                      </AccordionPanel>
                    </AccordionItem>
                    <ContractsInteract
                      config={props.config}
                      selectedNode={props.selectedNode}
                      compiledContract={compiledContract}
                      contractAddress={deployedAddress}
                      account={accountAddress}
                      privateFor={deployParams.privateFor}
                      privateFrom={currentTesseraPublicKey}
                      fromPrivateKey={deployParams.privateKeyFrom}
                      tesseraKeys={tesseraKeys}
                      selectLoading={selectLoading}
                      closeAllToasts={closeAll}
                      reuseToast={toast}
                      handleContractAddress={handleContractAddress}
                    />
                  </Accordion>
                </SimpleGrid>
              </TabPanel>

              {/* compiler output */}
              <TabPanel overflow="scroll" h="550px">
                <VStack
                  align="left"
                  divider={<Divider borderColor="gray.200" />}
                  spacing={1}
                >
                  {compiledContract.abi.length && (
                    <Code>{JSON.stringify(compiledContract.abi)}</Code>
                  )}
                  {compiledContract.bytecode && (
                    <Code>{compiledContract.bytecode.toString()}</Code>
                  )}
                </VStack>
              </TabPanel>

              {/* logs */}
              <TabPanel overflow="scroll" h="550px">
                <VStack
                  align="left"
                  divider={<Divider borderColor="gray.200" />}
                  spacing={1}
                >
                  {logs.map((log, i) => (
                    <Code key={i}>{log}</Code>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </MotionGrid>
    </>
  );
}
