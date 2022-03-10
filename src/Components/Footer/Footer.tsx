import {
  Container,
  Stack,
  VStack,
  IconButton,
  ButtonGroup,
  Text,
  Divider,
  Box,
  Link,
} from "@chakra-ui/react";
import { ConsensysIcon } from "./ConsensysIcon";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

function Footer() {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        mt={20}
      >
      <Divider />
      </MotionBox>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        as="footer"
        role="contentinfo"
        py={{ base: "5", md: "5" }}
        maxW={{ base: "container.sm", md: "container.xl" }}
      >
        <Stack spacing={0}>
          <Stack
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            align="center"
          >
            <ConsensysIcon boxSize="8em" />
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                href="https://www.linkedin.com/company/consensus-systems-consensys-/"
                aria-label="LinkedIn"
                icon={<FaLinkedin fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://github.com/ConsenSys/quorum-explorer"
                aria-label="GitHub"
                icon={<FaGithub fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://twitter.com/ConsenSys"
                aria-label="Twitter"
                icon={<FaTwitter fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </Stack>
          <VStack mt={0}>
            <Box>
              <Link isExternal href="https://besu.hyperledger.org/en/latest/"> Hyperledger Besu </Link> |
              <Link isExternal href="https://consensys.net/docs/goquorum/en/latest/"> GoQuorum </Link> |
              <Link isExternal href="https://docs.tessera.consensys.net/en/latest/"> Tessera </Link> |
              <Link isExternal href="https://docs.orchestrate.consensys.net/en/latest/"> Codefi Orchestrate </Link> |
              <Link isExternal href="https://discord.com/channels/697535391594446898/"> Discord </Link> |
              <Link isExternal href="https://consensys.net/contact/"> Contact </Link>
            </Box>
            <Text align={{ base: "center", md: "left" }} fontSize="sm" color="subtle" >
              &copy; {new Date().getFullYear()} ConsenSys Software, Inc. All rights reserved.
            </Text>
          </VStack>
        </Stack>
      </MotionContainer>
    </>
  );
}
export default Footer;
