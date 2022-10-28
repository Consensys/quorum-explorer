/* eslint-disable @next/next/link-passhref */
import { Button, chakra, Divider, Flex, HStack } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavItems } from "../../types/NavBar";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import MobileNav from "./MobileNav";
import { QuorumIcon } from "./QuorumIcon";

export default function NavBar() {
  return (
    <chakra.header id="header">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Flex w="100%" px="6" py="5" align="center" justify="space-between">
          <a href="/"><QuorumIcon /></a>
          {/* TODO: fix me up to avoid duplication of items  */}
          <HStack spacing="5" display={{ base: "none", md: "flex" }}>
            {NavItems.map((item, i) => (
              <Link key={i} href={"/" + item["label"].toLowerCase()} passHref>
                <Button
                  leftIcon={
                    <FontAwesomeIcon
                      icon={item["icon"] as IconProp}
                      fontSize="1.25rem"
                    />
                  }
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
        </Flex>
        <Divider />
      </motion.section>
    </chakra.header>
  );
}
