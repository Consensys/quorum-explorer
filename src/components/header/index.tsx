import { Heading, Divider, Container, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface IProps {
  headingName: string;
}

const MotionContainer = motion(Container);

export default function PageHeader({ headingName }: IProps) {
  return (
    <>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Heading as="h1" size="xl" m={3} textAlign="center">
          {headingName}
        </Heading>
        <Center>
          <Divider maxW="40vw" alignContent="center" />
        </Center>
      </MotionContainer>
    </>
  );
}
