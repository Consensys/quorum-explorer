import { signIn } from "next-auth/react";
import { Container, Heading, Center, VStack, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function AccessDenied() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container>
          <Center>
            <VStack>
              <Heading as="h1" size="4xl" noOfLines={1}>
                Access Denied
              </Heading>
              <a
                href="/api/auth/signin"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                You must be signed in to view this page
              </a>
              <Button
                colorScheme="blue"
                // href="/api/auth/signin"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </Button>
            </VStack>
          </Center>
        </Container>
      </motion.section>
    </>
  );
}
