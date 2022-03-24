import { useState } from "react";
import { QuorumWallet } from "../../types/Wallets";
import { QuorumConfig, QuorumNode } from "../../types/QuorumConfig";
import {
  Divider,
  Heading,
  Box,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Button,
} from "@chakra-ui/react";
import { getDetailsByNodeName } from "../../api/quorumConfig";
import { transferEth, getAccountBalance } from "../../api/wallets";
import { motion } from "framer-motion";
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
    const tx = await transferEth(
      needle.rpcUrl,
      privateKeyFrom,
      accountTo,
      amount
    );
    console.log(tx);

    const wallet: QuorumWallet = await getAccountBalance(
      needle.rpcUrl,
      accountTo
    );
    console.log(wallet);
    toast({
      title: "Eth Transfer",
      description: `The eth transfer was successul! Transaction hash: ${tx.txHash}. Account ${wallet.account} has an updated balance of ${wallet.balance} Wei`,
      status: "success",
      duration: 5000,
      position: "bottom",
      isClosable: true,
    });
    setButtonLoading(false);
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
          <FormControl as="form" onSubmit={handleTransfer} isRequired>
            <FormLabel htmlFor="privateKeyFrom">PrivateKey From</FormLabel>
            <Input
              mb={3}
              id="privateKeyFrom"
              type="text"
              placeholder="0x..."
              onChange={handlePrivateKeyFrom}
            />
            <FormLabel htmlFor="accountTo">Account To</FormLabel>
            <Input
              mb={3}
              id="accountTo"
              type="text"
              placeholder="0x..."
              onChange={handleAccountTo}
            />
            <FormLabel htmlFor="amount">
              Amount in wei (1 Ether = 1000000000000000000 wei)
            </FormLabel>
            <Input
              mb={3}
              id="amount"
              type="text"
              placeholder="0x..."
              onChange={handleAmount}
            />
            <Button
              type="submit"
              backgroundColor="green.200"
              isLoading={buttonLoading}
              loadingText="Submitting"
              variant="solid"
            >
              Transfer
            </Button>
          </FormControl>
        </Box>
      </MotionBox>
    </>
  );
}
