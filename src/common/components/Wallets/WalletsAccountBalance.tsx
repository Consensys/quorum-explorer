
import { Table, Tbody, Thead, Tr, Th, Td, Divider, Heading, Box, Center } from '@chakra-ui/react'
import { QuorumWallet } from "../../types/Wallets";
import { motion } from "framer-motion";
const MotionBox = motion(Box);

interface IProps {
  wallets: QuorumWallet[ ] 
}

export default function WalletsAccountBalance(props: IProps) {

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
      <Box mt={5} >
        <Heading as='h5' size='md' >
          Accounts 
        </Heading>
        <Divider/>
        <br/>
        <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Account</Th>
            <Th>Balance (ETH)</Th>
          </Tr>
        </Thead>
          <Tbody>
            {props.wallets.map((w, i) => (
            <Tr key="w.account" fontSize="md">
              <Td>{w.account}</Td>
              <Td>{w.balance}</Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      </MotionBox>
    </>
  );
}

