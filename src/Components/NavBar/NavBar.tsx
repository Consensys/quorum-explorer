
import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, HStack, Divider, chakra } from "@chakra-ui/react";
import MobileNav from "./MobileNav";
import { QuorumIcon } from "./QuorumIcon";
import { NavItems } from "../Types/NavBar";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion";
const MotionFlex = motion(Flex);

export default function NavBar() {
  
  return (
    <chakra.header id="header">
      <MotionFlex
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
      >
        <QuorumIcon />
        {/* TODO: fix me up to avoid duplication of items  */}
        <HStack spacing="5" display={{ base: "none", md: "flex" }}>
          {NavItems.map((item, i) => (
            <Link key={i} to={item["label"].toLowerCase()}>
              <Button
                leftIcon={<FontAwesomeIcon icon={item["icon"]} fontSize="1.25rem" />}
                variant="ghost"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </HStack>
        <HStack>
          <MobileNav />
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
      </MotionFlex>
      <Divider />
    </chakra.header>
  );
}
