import { ReactElement } from "react";
import { Box, Heading, Skeleton, HStack, VStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionHeading = motion(Heading);
const MotionBox = motion(Box);

interface IProps {
  title: string;
  text: string | number;
  icon: ReactElement;
  statusText: string;
}

export default function NodeCard({ title, text, icon, statusText }: IProps) {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: "5", md: "5" }}
        py={{ base: "5", md: "5" }}
        borderRadius="lg"
        borderWidth={2}
        boxShadow="lg"
      >
        <HStack spacing={10}>
          <MotionBox
            key={statusText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            end={{ opacity: 0 }}
          >
            {icon}
          </MotionBox>
          <VStack mb={3}>
            <MotionHeading
              key={title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              end={{ opacity: 0 }}
              fontSize={{ base: "md", md: "2xl" }}
            >
              {title}
            </MotionHeading>
            {statusText === "OK" ? (
              <MotionHeading
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                end={{ opacity: 0 }}
                fontSize="lg"
                color="muted"
              >
                {text}
              </MotionHeading>
            ) : (
              <Skeleton h="30px" w="40px" />
            )}
          </VStack>
        </HStack>
      </Flex>
    </>
  );
}
