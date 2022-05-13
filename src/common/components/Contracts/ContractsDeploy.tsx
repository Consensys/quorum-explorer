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
import { QuorumConfig } from "../../types/QuorumConfig";
import { CompiledContract, SCDefinition } from "../../types/Contracts";
import { getDetailsByNodeName, getPrivateKey } from "../../lib/quorumConfig";
import { getContractFunctions } from "../../lib/contracts"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
  compiledContract: CompiledContract;
  tesseraKeys: { label: string; value: string }[] | undefined;
  account: string;
  privateFor: string[];
  privateFrom: string;
  fromPrivateKey: string;
  selectLoading: boolean;
  setDeployedAddress: (e: string) => void; 
  closeAllToasts: () => void;
  reuseToast: any;
  logs: string[];
  setLogs: (e: any) => void;
}

export default function ContractsDeploy(props: IProps) {
  const [getSetTessera, setGetSetTessera] = useState<string[]>();
  const [deployButtonLoading, setDeployButtonLoading] = useState(false);

  const scDefinition : SCDefinition = getContractFunctions(props.compiledContract.abi)
  useEffect(() => {
    console.log("&&&&&&&&&")
    console.log(props)
    console.log("&&&&&&&&&")
  }, []);

  const handleConstructorArgs = (e: any) => {
    console.log("!!!! Constructor INIT !!!!")
    console.log(e.target.value);
    console.log("!!!! Constructor INIT !!!!")
    // setSimpleStorageValue(e.target.value);
  };
  
  // const handleDeploy = (e: any) => {
  //   console.log("!!!! HandleDeploy INIT !!!!")
  //   console.log(e.target.value);
  //   console.log("!!!! HandleDeploy INIT !!!!")
  // };
  

  const handleDeploy = async (e: any) => {
    e.preventDefault();
    if (props.account.length < 1) {
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
      props.account.length > 0 &&
      getSetTessera !== undefined &&
      getSetTessera.length > 0
      // && simpleStorageValue !== undefined
    ) {
      // go ahead if all necessary parameters selected
      const getAccountPrivKey = getPrivateKey(
        props.config,
        props.account
      ).privateKey;
      setDeployButtonLoading(true);
      const needle = getDetailsByNodeName(props.config, props.selectedNode);
      await axios({
        method: "POST",
        url: `/api/contractDeploy`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          client: needle.client,
          rpcUrl: needle.rpcUrl,
          privateUrl: needle.privateTxUrl,
          accountPrivateKey: getAccountPrivKey,
          privateForList: getSetTessera,
          compiledContract: props.compiledContract,
          deployArgs: 100,
        }),
        baseURL: `${process.env.NEXT_PUBLIC_QE_BASEPATH}`,
      })
        .then((result) => {
          props.closeAllToasts();
          props.reuseToast({
            title: "Deployed Contract!",
            description: `The contract was successfully deployed through ${props.selectedNode} @ address: ${result.data.contractAddress}`,
            status: "success",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          props.setDeployedAddress(result.data.contractAddress);
          const joined = props.logs.concat(
            "Contract Address: " +
              result.data.contractAddress
          );
          props.setLogs(joined);
          setDeployButtonLoading(false);
        })
        .catch((e) => {
          props.closeAllToasts();
          props.reuseToast({
            title: "Error!",
            description: `There was an error deploying the contract.`,
            status: "error",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          const joined = props.logs.concat(
            "Error in deploying contract"
          );
          props.setLogs(joined);
          setDeployButtonLoading(false);
        });
    }
  };

  return (
    <>
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
          />

            {scDefinition.constructor.inputs.map((input) => (
              <>
                <FormLabel htmlFor={input.name}>{input.name}</FormLabel>
                <Input id={input.name} onChange={handleConstructorArgs} />
              </>
            ))}

            <HStack mt={5}>
              <Button
                leftIcon={
                  <FontAwesomeIcon
                    icon={faRocket as IconProp}
                  />
                }
                loadingText="Deploying..."
                type="submit"
                variant="solid"
                // backgroundColor="green.200"
                colorScheme="green"
                onClick={handleDeploy}
              >
                Deploy
              </Button>
            </HStack>
        </FormControl>
      </AccordionPanel>
      </AccordionItem>
    </>
  );
}
