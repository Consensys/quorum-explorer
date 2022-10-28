/* eslint-disable @next/next/link-passhref */
import { Box, Flex, Heading, HStack, Skeleton, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactElement } from "react";
const MotionHeading = motion(Heading);
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface IProps {
  title: string;
  text: string | number;
  icon: ReactElement;
  statusText: string;
}

export default function NodeCard({ title, text, icon, statusText }: IProps) {
  const links: any = {
    Blocks: "/explorer",
    Peers: "#peers"
  }
  return (
    <Link
      href={links[title] ? links[title] : "/nodes"}>
      <MotionFlex
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: "5", md: "5" }}
        py={{ base: "5", md: "5" }}
        borderRadius="lg"
        borderWidth={2}
        boxShadow="md"
        cursor="pointer"
        whileHover={{
          scale: 1.05,
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
        }}

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
      </MotionFlex>
    </Link>
  );
}
