import React from "react";
import Link from "next/link";
import { useDisclosure, Flex, Button, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileDrawer from "./MobileDrawer";
import { NavItems } from "../../types/NavBar";

export default function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <Flex display={{ base: "flex", md: "none" }}>
      <Button ref={btnRef} onClick={onOpen}>
        <FontAwesomeIcon icon={faBars as IconProp} fontSize="20px" />
      </Button>
      <MobileDrawer isOpen={isOpen} onClose={onClose}>
        <VStack alignItems="left">
          {NavItems.map((item, i) => (
            <Link key={i} href={"/" + item["label"].toLowerCase()} passHref>
              <Button
                leftIcon={
                  <FontAwesomeIcon
                    icon={item["icon"] as IconProp}
                    fontSize="20px"
                  />
                }
                variant="text"
                onClick={onClose}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </VStack>
      </MobileDrawer>
    </Flex>
  );
}
