import {
  Container,
  Stack,
  IconButton,
  ButtonGroup,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { ConsensysIcon } from "./assets/Consensys";
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
        py={{ base: "12", md: "12" }}
        maxW={{ base: "container.sm", md: "container.lg" }}
      >
        <Stack spacing={{ base: "4", md: "5" }}>
          <Stack
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            align="center"
          >
            <ConsensysIcon boxSize="10em" />
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
          <Text
            align={{ base: "center", md: "left" }}
            fontSize="sm"
            color="subtle"
          >
            &copy; {new Date().getFullYear()} ConsenSys Software, Inc. All
            rights reserved.
          </Text>
        </Stack>
      </MotionContainer>
    </>
  );
}
export default Footer;
