import { useState, useEffect } from "react";
import { QuorumWallet } from "../../types/Wallets";
import { QuorumConfig, QuorumNode } from "../../types/QuorumConfig";
import {
  Divider,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Tag,
  HStack,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { getDetailsByNodeName } from "../../lib/quorumConfig";
import axios from "axios";
import { motion } from "framer-motion";
import { connectMetaMask, detectMetaMask } from "../../lib/connectMetaMask";
import MetaMask from "../Misc/MetaMask";
import { BigNumber, ethers } from "ethers";
import BN from "bn.js";

const MotionBox = motion(Box);

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
}

export default function WalletsTransferEth(props: IProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [privateKeyFrom, setPrivateKeyFrom] = useState("0x");
  const [accountTo, setAccountTo] = useState("0x");
  const [amount, setAmount] = useState("0x");
  const toast = useToast();
  const [metaMaskAccount, setMetaMaskAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);

  const connectHandler = () => {
    connectMetaMask();
  };

  useEffect(() => {
    if (metaMaskAccount.length !== 0) {
      console.log(`${metaMaskAccount} has been added to state...`);
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      signer.getBalance().then((res) => {
        const a = BigNumber.from(res);
        const b = BigNumber.from("1000000000000000000");
        setAccountBalance(a.div(b).toNumber());
      });
    }
  }, [metaMaskAccount]);

  useEffect(() => {
    function handleNewAccounts(newAccounts: string) {
      setMetaMaskAccount(newAccounts);
    }
    try {
      (window as any).ethereum
        .request({ method: "eth_accounts" })
        .then(handleNewAccounts);
      (window as any).ethereum.on("accountsChanged", handleNewAccounts);
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
        }
      });
    };
  }, []);

  const needle: QuorumNode = getDetailsByNodeName(
    props.config,
    props.selectedNode
  );

  const handlePrivateKeyFrom = (e: any) => {
    setPrivateKeyFrom(e.target.value);
  };

  const handleAccountTo = (e: any) => {
    setAccountTo(e.target.value);
  };

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const handleTransfer = async (e: any) => {
    e.preventDefault();
    setButtonLoading(true);
    const ethRes = await axios({
      method: "POST",
      url: `/api/walletTransferEth`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        rpcUrl: needle.rpcUrl,
        privateKeyFrom: privateKeyFrom,
        accountTo: accountTo,
        amount: amount,
      }),
      baseURL: `${process.env.NEXT_PUBLIC_QE_BASEPATH}`,
    });
    const walletRes = await axios({
      method: "POST",
      url: `/api/walletGetBalance`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        rpcUrl: needle.rpcUrl,
        account: accountTo,
      }),
      baseURL: `${process.env.NEXT_PUBLIC_QE_BASEPATH}`,
    });
    var wallet: QuorumWallet = walletRes.data as QuorumWallet;
    toast({
      title: "Eth Transfer",
      description: `The eth transfer was successul! Transaction hash: ${ethRes.data.txHash}. Account ${wallet.account} has an updated balance of ${wallet.balance} Wei`,
      status: "success",
      duration: 5000,
      position: "bottom",
      isClosable: true,
    });
    setButtonLoading(false);
  };

  const metamaskTransfer = async (e: any) => {
    e.preventDefault();
    setButtonLoading(true);
    if (metaMaskAccount.length === 0) {
      console.error("No account connected with MetaMask!");
      setButtonLoading(false);
      return;
    }
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    const params = {
      from: await signer.getAddress(),
      to: accountTo,
      value: ethers.utils.parseUnits(amount.trim(), "ether").toHexString(),
    };
    const sendTx = await signer.sendTransaction(params);
    toast({
      title: "Transaction Hash",
      description: `${sendTx.hash.toString()}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    const finished = await sendTx.wait();
    toast({
      title: "Successful transaction",
      description: `BlockHash: ${finished.blockHash.toString()}`,
      status: "success",
      duration: 10000,
      isClosable: true,
    });
    signer.getBalance().then((res) => {
      const a = BigNumber.from(res);
      const b = BigNumber.from("1000000000000000000");
      setAccountBalance(a.div(b).toNumber());
    });
    setButtonLoading(false);
  };

  const switchChain = async () => {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x539" }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        console.error("Network does not exist in MetaMask!");
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x539",
                chainName: "Localhost",
                rpcUrls: ["http://localhost:8545"],
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
          console.error(addError);
        }
      }
      // handle other "switch" errors
    }
  };

  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        borderRadius="lg"
        borderWidth={2}
        p={5}
        mx={2}
        my={3}
      >
        <Box mt={5}>
          <Heading as="h5" size="md">
            Transfer ETH to Account
          </Heading>
          <Divider />
          <br />
          <Center>
            <VStack>
              <HStack>
                <Text>Address: </Text>
                <Tag
                  size="md"
                  variant="solid"
                  colorScheme={metaMaskAccount.length !== 0 ? "green" : "red"}
                >
                  {metaMaskAccount.length !== 0
                    ? metaMaskAccount
                    : "No Account Connected"}
                </Tag>
              </HStack>
              <HStack>
                <Text>Balance (ETH): </Text>
                <Tag size="lg" variant="solid" colorScheme="teal">
                  {accountBalance}
                </Tag>
              </HStack>
            </VStack>
          </Center>
          <FormControl as="form" onSubmit={metamaskTransfer} isRequired>
            {/* <FormLabel htmlFor="privateKeyFrom">PrivateKey From</FormLabel>
            <Input
              mb={3}
              id="privateKeyFrom"
              type="text"
              placeholder="0x..."
              onChange={handlePrivateKeyFrom}
            /> */}
            <FormLabel htmlFor="accountTo">Account To</FormLabel>
            <Input
              mb={3}
              id="accountTo"
              type="text"
              placeholder="0x..."
              onChange={handleAccountTo}
            />
            <FormLabel htmlFor="amount">Amount in ETH</FormLabel>
            <Input
              mb={3}
              id="amount"
              type="text"
              placeholder="1"
              onChange={handleAmount}
            />
            {metaMaskAccount.length === 0 && (
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
            {/* <Button
              colorScheme="blue"
              loadingText="Switching..."
              variant="solid"
              onClick={switchChain}
              mr={3}
              isDisabled
            >
              Switch Chain
            </Button> */}
            <Button
              type="submit"
              colorScheme="orange"
              loadingText="Submitting"
              variant="solid"
              onSubmit={metamaskTransfer}
              isLoading={buttonLoading}
            >
              Transfer
            </Button>
          </FormControl>
        </Box>
      </MotionBox>
    </>
  );
}
