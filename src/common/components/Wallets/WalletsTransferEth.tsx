import { useState, useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Code,
} from "@chakra-ui/react";
import { getDetailsByNodeName } from "../../lib/quorumConfig";
import { motion } from "framer-motion";
import { connectMetaMask, detectMetaMask } from "../../lib/connectMetaMask";
import MetaMask from "../Misc/MetaMask";
import { BigNumber, ethers } from "ethers";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const MotionBox = motion(Box);

interface IProps {
  config: QuorumConfig;
  selectedNode: string;
}

export default function WalletsTransferEth(props: IProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [accountTo, setAccountTo] = useState("0x");
  const [amount, setAmount] = useState("0x");
  const toast = useToast();
  const [metaMaskAccount, setMetaMaskAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [myChain, setMyChain] = useState({ chainId: "", chainName: "" });
  const [metaChain, setMetaChain] = useState({ chainId: "", chainName: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sentTx, setSentTx] = useState({
    blockHash: "",
    blockNumber: 0,
    confirmations: 0,
    transactionHash: "",
  });

  const needle: QuorumNode = getDetailsByNodeName(
    props.config,
    props.selectedNode
  );

  const connectHandler = () => {
    connectMetaMask();
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
          setMyChain(res.data);
        })
        .catch((err) => console.error(err));
      const provider2 = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      provider2.getNetwork().then((res) => {
        setMetaChain({
          chainId: "0x" + res.chainId.toString(16),
          chainName: res.name,
        });
      });
    } catch (err) {
      console.error(err);
    }
  }, [needle]);

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
  }, []);

  const handleAccountTo = (e: any) => {
    setAccountTo(e.target.value);
  };

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const metamaskTransfer = async (e: any) => {
    e.preventDefault();
    setButtonLoading(true);
    if (metaMaskAccount.length === 0) {
      console.error("No account connected with MetaMask!");
      toast({
        title: "No Account Connected",
        description: `Please connect your MetaMask account by clicking the button to the left`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setButtonLoading(false);
      return;
    }
    if (metaChain.chainId !== myChain.chainId) {
      console.error("You are on the wrong chain!");
      toast({
        title: "Wrong Chain",
        description: `Please select/add the network to MetaMask!`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
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
    try {
      const sendTx = await signer.sendTransaction(params);
      toast({
        title: `Transaction Hash: ${sendTx.hash.toString()}`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      const finished = await sendTx.wait();
      console.log(finished);
      setSentTx(finished);
      onOpen();
      signer.getBalance().then((res) => {
        const a = BigNumber.from(res);
        const b = BigNumber.from("1000000000000000000");
        setAccountBalance(a.div(b).toNumber());
      });
      setButtonLoading(false);
    } catch (err: any) {
      console.error(err);
      if (err.code === 4001) {
        toast({
          title: `User declined transaction`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setButtonLoading(false);
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
        boxShadow="2xl"
        p={5}
        mx={2}
        my={3}
      >
        <Box mt={5}>
          <Heading as="h5" size="md" mb={5}>
            Transfer ETH
          </Heading>
          <Divider />
          <br />
          <Center>
            <VStack>
              <HStack>
                <Text>Network Chain: </Text>
                <Tag
                  size="md"
                  variant="solid"
                  colorScheme={
                    metaChain.chainId === myChain.chainId ? "green" : "red"
                  }
                >
                  {myChain.chainId.length !== 0
                    ? parseInt(myChain.chainId, 16)
                    : "No Chain Connected"}
                </Tag>
                <Divider orientation="vertical" h="25px" />

                <Text>MetaMask Chain: </Text>
                <Tag
                  size="md"
                  variant="solid"
                  colorScheme={
                    metaChain.chainId === myChain.chainId ? "green" : "red"
                  }
                >
                  {metaChain.chainId.length !== 0
                    ? parseInt(metaChain.chainId, 16)
                    : "No Chain Connected"}
                </Tag>
              </HStack>
              <HStack>
                <Text>Address: </Text>
                <Tag
                  size="md"
                  variant="solid"
                  colorScheme={
                    metaMaskAccount.length !== 0 ? "green" : "yellow"
                  }
                >
                  {metaMaskAccount.length !== 0
                    ? metaMaskAccount
                    : "No Account Connected"}
                </Tag>
              </HStack>
              <HStack>
                <Text>Balance (ETH): </Text>
                <Tag size="lg" variant="solid" colorScheme="teal">
                  {metaMaskAccount.length === 0 ? "0" : accountBalance}
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
            {/* <Button
              colorScheme="blue"
              loadingText="Switching..."
              variant="solid"
              onClick={switchChain}
              mr={3}
              isDisabled={myChain.chainId !== metaChain.chainId ? false : true}
            >
              Switch Chain
            </Button> */}
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
            {metaMaskAccount.length > 0 && (
              <Button
                colorScheme="red"
                variant="outline"
                onClick={disconnectHandler}
                mr={3}
              >
                Switch Account
              </Button>
            )}
            <Button
              type="submit"
              colorScheme="orange"
              loadingText="Submitting"
              variant="solid"
              onSubmit={metamaskTransfer}
              isLoading={buttonLoading}
              isDisabled={metaMaskAccount.length === 0 ? true : false}
            >
              Transfer
            </Button>
          </FormControl>
        </Box>
      </MotionBox>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmed Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Block Number: <Code colorScheme="blue">{sentTx.blockNumber}</Code>
            <br />
            TX Hash: <Code colorScheme="purple">{sentTx.transactionHash}</Code>
            <br />
            Confirmations:{" "}
            <Code colorScheme="green">{sentTx.confirmations}</Code> <br />
            Current Balance: <Code colorScheme="yellow">
              {accountBalance}
            </Code>{" "}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
