import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  useToast,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";
//@ts-ignore
import { QuorumConfig } from "../../types/QuorumConfig";
import { CompiledContract } from "../../types/Contracts";
import { getDetailsByNodeName } from "../../api/quorumConfig";
import axios from "axios";

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
}

export default function ContractsInteract(props: IProps) {
  const toast = useToast();
  const [contractAddress, setContractAddress] = useState(props.contractAddress);
  const [readButtonLoading, setReadButtonLoading] = useState(false);
  const [writeValue, setWriteValue] = useState("0");
  const [writeButtonLoading, setWriteButtonLoading] = useState(false);
  const [getSetTessera, setGetSetTessera] = useState<string[]>();
  const [readValue, setReadValue] = useState("-");

  useEffect(() => {
    setContractAddress(props.contractAddress);
  }, [props.contractAddress]);

  const handleContractAddress = (e: any) => {
    setContractAddress(e.target.value);
  };

  const handleWriteValue = (e: any) => {
    setWriteValue(e);
  };

  const handleRead = async (e: any) => {
    e.preventDefault();
    setReadButtonLoading(true);
    const needle = getDetailsByNodeName(props.config, props.selectedNode);
    if (contractAddress.length < 1) {
      toast({
        title: "Notice",
        description: `No contract has been deployed!`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    if (getSetTessera === undefined || getSetTessera.length < 1) {
      toast({
        title: "Notice",
        description: `No Tessera recipients selected`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    if (contractAddress.length > 0) {
      await axios({
        method: "POST",
        url: "/api/contractRead",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          client: needle.client,
          rpcUrl: needle.rpcUrl,
          privateUrl: needle.privateTxUrl,
          contractAddress: contractAddress,
          compiledContract: props.compiledContract,
          privateFrom: props.privateFrom,
          privateFor: getSetTessera,
          fromPrivateKey: props.fromPrivateKey,
        }),
      })
        .then((result) => {
          console.log("?????>>>>>>");
          console.log(result);
          if (result.data === null || result.data === "") {
            setReadValue("-");
            toast({
              title: "Not a Party!",
              description: `${props.selectedNode} is not a member to the transaction!`,
              status: "info",
              duration: 5000,
              position: "bottom",
              isClosable: true,
            });
          } else {
            setReadValue(result.data);
            toast({
              title: "Read Success!",
              description: `Value from contract: ${result.data}`,
              status: "success",
              duration: 5000,
              position: "bottom",
              isClosable: true,
            });
          }
        })
        .catch((e) => {
          toast({
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

  const handleWrite = async (e: any) => {
    e.preventDefault();
    setWriteButtonLoading(true);
    if (contractAddress.length < 1) {
      toast({
        title: "Notice",
        description: `No contract has been deployed!`,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    if (contractAddress.length > 0) {
      const needle = getDetailsByNodeName(props.config, props.selectedNode);
      await axios({
        method: "POST",
        url: "/api/contractSet",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          client: needle.client,
          rpcUrl: needle.rpcUrl,
          privateUrl: needle.privateTxUrl,
          value: parseInt(writeValue),
          fromPrivateKey: props.fromPrivateKey,
          contractAddress: contractAddress,
          compiledContract: props.compiledContract,
          sender: props.privateFrom,
          privateFor: getSetTessera,
        }),
      })
        .then((result) => {
          console.log(result);
          toast({
            title: "Success!",
            description: `Contract set function called successfully.`,
            status: "success",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Error!",
            description: `${err}`,
            status: "error",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
        });
    }
    setWriteButtonLoading(false);
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
              value={contractAddress}
              onChange={handleContractAddress}
              isDisabled
            />
            <FormLabel htmlFor="private-for-deploy">Recipient</FormLabel>
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
              placeholder="Select Tessera node..."
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
            />
          </FormControl>

          <Flex justifyContent="space-between" alignItems="center" m={1}>
            <Text fontWeight="semibold">get</Text>
            <HStack spacing={5}>
              <Input
                size="sm"
                maxW={100}
                value={readValue}
                textAlign="center"
              />
              <Button
                type="submit"
                backgroundColor="orange.200"
                isLoading={readButtonLoading}
                onClick={handleRead}
                loadingText="Reading"
                variant="solid"
                minW={100}
              >
                Read
              </Button>
            </HStack>
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
                minW={100}
                type="submit"
                backgroundColor="green.200"
                isLoading={writeButtonLoading}
                onClick={handleWrite}
                loadingText="Writing"
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
