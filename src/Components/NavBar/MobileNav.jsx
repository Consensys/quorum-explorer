import React from "react";
import { Link } from "react-router-dom";
import { useDisclosure, Flex, Button, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileDrawer from "./MobileDrawer";
import {
  faUsers,
  faServer,
  faCompass,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

export const NavItems = [
  {
    label: "Nodes",
    icon: faServer,
  },
  {
    label: "Validators",
    icon: faUsers,
  },
  {
    label: "Explorer",
    icon: faCompass,
  },
  {
    label: "Contracts",
    icon: faFileAlt,
  },
];
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
            <Link key={i} to={item["label"].toLowerCase()}>
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
