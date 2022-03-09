import { Heading, Divider, Center, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface IProps {
  HeadingName: string;
}

const MotionContainer = motion(Container);

export default function PageHeader({ HeadingName }: IProps) {
  return (
    <>
      <MotionContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
      >
          <Heading as="h1" size="xl" m={3} textAlign="center">
            {HeadingName}
          </Heading>
          <Divider maxW="40vw"/>
      </MotionContainer>
    </>
  );
}
