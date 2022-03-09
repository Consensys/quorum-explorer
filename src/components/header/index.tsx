import { Heading, Divider, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface IProps {
  HeadingName: string;
}

export default function PageHeader({ HeadingName }: IProps) {
  return (
    <>
      <Center>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Heading as="h1" size="xl" m={3}>
            {HeadingName}
          </Heading>
          <Divider maxW="40vw" />
        </motion.div>
      </Center>
    </>
  );
}
