import { useEffect, useState } from "react";
import {
  FormControl,
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
import { QuorumConfig } from "../../types/QuorumConfig";
import { CompiledContract, SCDefinition } from "../../types/Contracts";
import { getDetailsByNodeName, getPrivateKey } from "../../lib/quorumConfig";
import { getContractFunctions, setFunctionArgValue } from "../../lib/contracts";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { BigNumber, ethers } from "ethers";

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
  setDeployedAddress: (e: string) => void;
  closeAllToasts: () => void;
  reuseToast: any;
  logs: string[];
  setLogs: (e: any) => void;
  getSetTessera: string[];
  privTxState: boolean;
  myChain: { chainId: string; chainName: string };
  metaChain: { chainId: string; chainName: string };
}

export default function ContractsDeploy(props: IProps) {
  // const [getSetTessera, setGetSetTessera] = useState<string[]>();
  const [deployButtonLoading, setDeployButtonLoading] = useState(false);
  const scDefinition: SCDefinition = getContractFunctions(
    props.compiledContract.abi
  );
  const [constructorParams, setConstructorParams] = useState<any>({});

  const handleConstructorArgs = (e: any) => {
    const constructName = e.target.id;
    setConstructorParams({
      ...constructorParams,
      [`${constructName}`]: e.target.value,
    });
  };

  useEffect(() => {
    // dirty way to remove from constructor state if switching contracts
    const newObj: any = {};
    Object.keys(constructorParams).map((x) => {
      const res =
        Object.values(scDefinition.constructor.inputs)
          .map((x) => x.name)
          .includes(x) && (newObj[x] = constructorParams[x]);
      setConstructorParams(newObj);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.compiledContract]);

  const handleDeploy = async (e: any) => {
    e.preventDefault();
    const needle = getDetailsByNodeName(props.config, props.selectedNode);

    if (props.privTxState && props.account.length < 1) {
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
      needle.privateTxUrl !== "" &&
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
      // public transaction
      if (props.metaChain.chainId !== props.myChain.chainId) {
        // check whether selected chain is also the network chain
        console.error("You are on the wrong chain!");
        props.reuseToast({
          title: "Wrong Chain",
          description: `Please select/add the network to MetaMask!`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setDeployButtonLoading(true);

      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const factory = new ethers.ContractFactory(
        props.compiledContract.abi,
        props.compiledContract.bytecode,
        signer
      );
      try {
        const contract = await factory.deploy(
          ...Object.values(constructorParams)
        );
        props.reuseToast({
          title: `Deploying...`,
          description: `TX Hash: ${contract.deployTransaction.hash}`,
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        const txReceipt = await contract.deployTransaction.wait();
        props.reuseToast({
          title: "Deployed!",
          description: `Deployed contract available @ ${txReceipt.contractAddress} on block ${txReceipt.blockNumber}`,
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        props.setDeployedAddress(txReceipt.contractAddress);
        const joined = props.logs.concat(
          "Contract Address: " + txReceipt.contractAddress
        );
        props.setLogs(joined);
      } catch (err) {
        props.closeAllToasts();
        console.error(err);
        props.reuseToast({
          title: "Error!",
          description: `An issue was encountered deploying the public contract`,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
        const joined = props.logs.concat("Error deploying contract");
        props.setLogs(joined);
      } finally {
        setDeployButtonLoading(false);
      }
    }

    if (
      props.privTxState &&
      props.account.length > 0 &&
      props.getSetTessera !== undefined &&
      props.getSetTessera.length > 0
    ) {
      // private transaction
      const getAccountPrivKey = getPrivateKey(
        props.config,
        props.account
      ).privateKey;
      setDeployButtonLoading(true);
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
          privateForList: props.getSetTessera,
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
          const joined = props.logs.concat("Error deploying contract");
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
            {scDefinition.constructor.inputs.map((input) => (
              <>
                <Text
                  key="text-{input.name}"
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
            <HStack mt={scDefinition.constructor.inputs.length > 0 ? 4 : 0}>
              <Button
                leftIcon={<FontAwesomeIcon icon={faRocket as IconProp} />}
                loadingText="Deploying..."
                type="submit"
                variant="solid"
                // backgroundColor="green.200"
                colorScheme="green"
                onClick={handleDeploy}
                isLoading={deployButtonLoading}
                isDisabled={
                  props.compiledContract.abi.length === 0 &&
                  props.compiledContract.bytecode.length === 0
                }
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
