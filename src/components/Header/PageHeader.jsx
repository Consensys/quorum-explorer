import React from "react";
import { Heading, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function PageHeader({ HeadingName }) {
  return (
    <>
      <motion.center
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Heading as="h1" size="xl" m={3}>
          {HeadingName}
        </Heading>
        <Divider maxW="40vw" />
      </motion.center>
    </>
  );
}
