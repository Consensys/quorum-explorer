import { signIn } from "next-auth/react";
import { Container, Heading, Center, VStack, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

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
        <Container mt={10}>
          <Center>
            <VStack gap={3}>
              <Heading as="h1" size="4xl" noOfLines={1}>
                Access Denied
              </Heading>
              <Link href="/api/auth/signin">
                You must be signed in to view this page.
              </Link>
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
