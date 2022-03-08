import { Flex, Button, HStack, chakra } from "@chakra-ui/react";
import { QuorumIcon } from "../../assets/Quorum";
import { Link } from "react-router-dom";
import React from "react";
import { data } from "./header";
import MobileNav from "./MobileNav";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <chakra.header id="header">
        <Flex w="100%" px="6" py="5" align="center" justify="space-between">
          <QuorumIcon />
          <HStack spacing="5" display={{ base: "none", md: "flex" }}>
            {data.map((item, i) => (
              <Link key={i} to={item["label"].toLowerCase()}>
                <Button leftIcon={item["icon"]} variant="ghost">
                  {item.label}
                </Button>
              </Link>
            ))}
          </HStack>
          <HStack>
            <MobileNav />
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
        </Flex>
      </chakra.header>
    </motion.div>
  );
}
