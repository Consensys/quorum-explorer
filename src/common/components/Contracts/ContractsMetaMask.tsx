import { useEffect } from "react";
import { QuorumConfig, QuorumNode } from "../../types/QuorumConfig";
import { getDetailsByNodeName } from "../../lib/quorumConfig";
import { connectMetaMask, detectMetaMask } from "../../lib/connectMetaMask";
import MetaMask from "../Misc/MetaMask";
import { ethers } from "ethers";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
  privTxState: boolean;
  metaMaskAccount: string;
  setMetaMaskAccount: any;
  setMetaChain: any;
  setMyChain: any;
}

export default function ContractsMetaMask(props: IProps) {
  const toast = useToast();

  const needle: QuorumNode = getDetailsByNodeName(
    props.config,
    props.selectedNode
  );

  const connectHandler = () => {
    connectMetaMask().then((res) => {
      if (res === null) {
        toast({
          title: "MetaMask not Installed!",
          description: `Please ensure MetaMask is installed or enabled in your browser`,
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      }
    });
  };
  const disconnectHandler = async () => {
    await (window as any).ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  };
  useEffect(() => {
    // get the chainId through the selected node
    try {
      // const rpcUrl = needle.rpcUrl;
      // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      // provider.getNetwork().then((res) => {
      //   props.setMyChain({
      //     chainId: "0x" + res.chainId.toString(16),
      //     chainName: res.name,
      //   });
      // });
      axios({
        method: "POST",
        url: `/api/getChainId`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ rpcUrl: needle.rpcUrl }),
        baseURL: `${publicRuntimeConfig.QE_BASEPATH}`,
      })
        .then((res) => {
          props.setMyChain(res.data);
        })
        .catch((err) => console.error(err));
      const provider2 = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      provider2.getNetwork().then((res) => {
        props.setMetaChain({
          chainId: "0x" + res.chainId.toString(16),
          chainName: res.name,
        });
      });
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needle]);

  useEffect(() => {
    if (props.metaMaskAccount.length !== 0) {
      console.log(`${props.metaMaskAccount} has been added to state...`);
    }
  }, [props.metaMaskAccount]);

  useEffect(() => {
    function handleNewAccounts(newAccounts: string) {
      props.setMetaMaskAccount(newAccounts);
    }
    try {
      (window as any).ethereum
        .request({ method: "eth_accounts" })
        .then(handleNewAccounts);
      (window as any).ethereum.on("accountsChanged", handleNewAccounts);
      (window as any).ethereum.on("chainChanged", (chainId: string) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    } catch (err) {
      console.error(err);
    }
    return () => {
      detectMetaMask().then((res) => {
        if (res) {
          console.log("Clean up listener");
          (window as any).ethereum.removeListener(
            "accountsChanged",
            handleNewAccounts
          );
          (window as any).ethereum.removeListener(
            "chainChanged",
            handleNewAccounts
          );
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {props.metaMaskAccount.length === 0 && (
        <Button
          leftIcon={<MetaMask />}
          colorScheme="orange"
          variant="outline"
          onClick={connectHandler}
          mr={3}
        >
          Connect
        </Button>
      )}
      {props.metaMaskAccount.length > 0 && (
        <Button
          colorScheme="red"
          variant="outline"
          onClick={disconnectHandler}
          mr={3}
        >
          Switch Account
        </Button>
      )}
    </>
  );
}
