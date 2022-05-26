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
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { QuorumConfig } from "../../types/QuorumConfig";
import { CompiledContract, SCDefinition } from "../../types/Contracts";
import { getDetailsByNodeName, getPrivateKey } from "../../lib/quorumConfig";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";

import getConfig from "next/config";
import { getContractFunctions } from "../../lib/contracts";
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
  logs: string[];
  setLogs: (e: any) => void;
  getSetTessera: string[];
  privTxState: boolean;
  myChain: { chainId: string; chainName: string };
  metaChain: { chainId: string; chainName: string };
  contractToDeploy: string;
  handleDeployContract: (e: any) => void;
  contractFunctions: SCDefinition;
  handleDeployedAddress: any;
  setInteractAddress: any;
  contractToInteract: any;
}

export default function ContractsDeploy(props: IProps) {
  const [deployButtonLoading, setDeployButtonLoading] = useState(false);
  const [constructorParams, setConstructorParams] = useState<any>({});

  const handleConstructorArgs = (e: any, i: any) => {
    const constructName = e.target.id;
    try {
      JSON.parse(e.target.value);
      setConstructorParams({
        ...constructorParams,
        [`${constructName}`]:
          i.type === "bytes"
            ? ethers.utils.formatBytes32String(e.target.value)
            : JSON.parse(e.target.value),
      });
    } catch (err) {
      setConstructorParams({
        ...constructorParams,
        [`${constructName}`]: e.target.value,
      });
    }
  };

  // useEffect(() => {
  //   console.log(props.contractFunctions);
  //   console.log(props.contractToDeploy);
  // }, [props.contractFunctions, props.contractToDeploy]);

  useEffect(() => {
    // dirty way to remove from constructor state if switching contracts
    const newObj: any = {};
    const nameMap = Object.values(
      props.contractFunctions!.constructor.inputs
    ).map((x) => x.name);
    Object.keys(constructorParams).map((x) => {
      nameMap.includes(x) && (newObj[x] = constructorParams[x]);
      setConstructorParams(newObj);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.compiledContract, props.contractFunctions]);

  const handleDeploy = async (e: any) => {
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
      // console.log(props.metaChain.chainId, props.myChain.chainId);
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
        props.compiledContract[props.contractToDeploy].abi,
        props.compiledContract[props.contractToDeploy].bytecode,
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
          description: `Contract available @ ${txReceipt.contractAddress} on block #${txReceipt.blockNumber}`,
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        props.handleDeployedAddress({
          contract: props.contractToDeploy,
          deployedAddress: txReceipt.contractAddress,
        });
        props.setInteractAddress(txReceipt.contractAddress);
        const joined = props.logs.concat(
          "Contract Address: " + txReceipt.contractAddress
        );
        props.setLogs(joined);
      } catch (err: any) {
        props.closeAllToasts();
        console.error(err);
        props.reuseToast({
          title: "Error!",
          description: `MetaMask error: ${err.code}`,
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
          compiledContract: props.compiledContract[props.contractToDeploy],
          deployArgs: [
            props.contractFunctions!.constructor.inputs,
            Object.values(constructorParams),
          ],
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
          props.handleDeployedAddress({
            contract: props.contractToDeploy,
            deployedAddress: result.data.contractAddress,
          });
          props.setInteractAddress(result.data.contractAddress);
          const joined = props.logs.concat(
            "Contract Address: " + result.data.contractAddress
          );
          props.setLogs(joined);
          setDeployButtonLoading(false);
        })
        .catch((e) => {
          console.error(e);
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
            <FormLabel htmlFor="select-deploy-contract">
              Select Contract
            </FormLabel>
            <Select
              id="select-deploy-contract"
              value={props.contractToDeploy}
              onChange={props.handleDeployContract}
            >
              {Object.keys(props.compiledContract).map((c, i) => {
                if (props.compiledContract[c].bytecode !== "") {
                  return (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  );
                }
              })}
            </Select>
            {props.contractFunctions!.constructor.inputs.map((input) => (
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
                  onChange={(e) => handleConstructorArgs(e, input)}
                />
              </>
            ))}
            <HStack mt={4}>
              <Button
                leftIcon={<FontAwesomeIcon icon={faRocket as IconProp} />}
                loadingText="Deploying..."
                type="submit"
                variant="solid"
                // backgroundColor="green.200"
                colorScheme="green"
                onClick={handleDeploy}
                isLoading={deployButtonLoading}
                isDisabled={props.contractToDeploy === ""}
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
