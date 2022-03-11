import { useDisclosure, Flex, Button, VStack } from "@chakra-ui/react";
//uses MobileNav as a sub component
import MobileDrawer from "./MobileDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from '@chakra-ui/react'
import { NavItems } from "../Types/NavBar";
import React from "react";

export default function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <Flex display={{ base: "flex", md: "none" }}>
      <Button ref={btnRef} onClick={onOpen}>
        <FontAwesomeIcon icon={faBars} fontSize="20px" />
      </Button>
      <MobileDrawer isOpen={isOpen} onClose={onClose}>
        <VStack alignItems="left">
          {NavItems.map((item, i) => (
            <Link key={i} href={item["label"].toLowerCase()}>
              <Button
                leftIcon={
                  <FontAwesomeIcon icon={item["icon"]} fontSize="20px" />
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
