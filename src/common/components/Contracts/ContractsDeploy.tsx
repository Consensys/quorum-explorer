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
  Text,
  Input,
  HStack,
} from "@chakra-ui/react";
// import { Select as MultiSelect } from "chakra-react-select";
import { QuorumConfig } from "../../types/QuorumConfig";
import { CompiledContract, SCDefinition } from "../../types/Contracts";
import { getDetailsByNodeName, getPrivateKey } from "../../lib/quorumConfig";
import {
  getContractFunctions,
  setFunctionArgValue,
  getDefaultValue,
} from "../../lib/contracts";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const DynamicSelect = dynamic(
  // @ts-ignore
  () => import("chakra-react-select").then((mod) => mod.Select),
  {
    loading: () => <p>Loading Select component...</p>,
    ssr: false,
  }
);

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
  const scDefinition: SCDefinition = getContractFunctions(
    props.compiledContract.abi
  );

  const handleConstructorArgs = (e: any) => {
    setFunctionArgValue(
      scDefinition.constructor.inputs,
      e.target.id,
      e.target.value
    );
    // console.log(scDefinition);
  };

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
          deployArgs: scDefinition.constructor.inputs,
        }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
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
            "Contract Address: " + result.data.contractAddress
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
          const joined = props.logs.concat("Error in deploying contract");
          props.setLogs(joined);
          setDeployButtonLoading(false);
        });
    }
  };
  return (
    <>
      <AccordionItem>
        <AccordionButton>
          <Box color="red.400" fontWeight="bold" flex="1" textAlign="left">
            2. Deploy
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <FormControl>
            <FormLabel htmlFor="private-for">Private For</FormLabel>
            <DynamicSelect
              //@ts-ignore
              isLoading={props.selectLoading}
              instanceId="private-for-deploy"
              isMulti
              options={props.tesseraKeys}
              onChange={(e: any) => {
                const myList: string[] = [];
                e.map((k: any) => myList.push(k.value));
                setGetSetTessera(myList);
              }}
              placeholder="Select Tessera node recipients..."
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
            />

            {scDefinition.constructor.inputs.map((input) => (
              <>
                <Text
                  fontSize="sm"
                  as="i"
                >{`${input.name} (${input.type})`}</Text>
                <Input
                  key="input-{input.name}"
                  id={input.name}
                  placeholder={input.value}
                  onChange={handleConstructorArgs}
                />
              </>
            ))}

            <HStack mt={5}>
              <Button
                leftIcon={<FontAwesomeIcon icon={faRocket as IconProp} />}
                loadingText="Deploying..."
                type="submit"
                variant="solid"
                // backgroundColor="green.200"
                colorScheme="green"
                onClick={handleDeploy}
                isLoading={deployButtonLoading}
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
