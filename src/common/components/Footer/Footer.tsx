import {
  Box, ButtonGroup, Container, Divider, IconButton, Link, Stack, Text, VStack
} from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedin, faTwitter, faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { ConsensysIcon } from "./ConsensysIcon";
const MotionBox = motion(Box);
const MotionContainer = motion(Container);

export default function Footer() {
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
              <Link isExternal href="https://twitter.com/CRUBNOfficial">
                <IconButton
                  aria-label="Twitter"
                  icon={
                    <FontAwesomeIcon
                      icon={faTwitter as IconProp}
                      fontSize="1.25rem"
                    />
                  }
                />
              </Link>
              <Link
                isExternal
                href="https://www.youtube.com/channel/UC5BOLjAQM2NMAhN14EKD47A"
              >
                <IconButton
                  aria-label="Youtube"
                  icon={
                    <FontAwesomeIcon
                      icon={faYoutube as IconProp}
                      fontSize="1.25rem"
                    />
                  }
                />
              </Link>
              <Link
                isExternal
                href="https://www.linkedin.com/company/crubn/"
              >
                <IconButton
                  aria-label="LinkedIn"
                  icon={
                    <FontAwesomeIcon
                      icon={faLinkedin as IconProp}
                      fontSize="1.25rem"
                    />
                  }
                />
              </Link>
            </ButtonGroup>
          </Stack>
          <VStack mt={0}>
            <Box sx={{ display: "inline-flex" }}>
              <strong>Contact Us:&nbsp;</strong>
              <a href="mailto: info@crubn.com">&nbsp; info@crubn.com&nbsp;</a>
              |
              <a href="tel: +91-9149338300">&nbsp; +91-9149338300</a>

            </Box>
            <Text
              align={{ base: "center", md: "left" }}
              fontSize="sm"
              color="subtle"
            >
              &copy; {new Date().getFullYear()} CRUBN. All
              rights reserved.
            </Text>
          </VStack>
        </Stack>
      </MotionContainer>
    </>
  );
}
