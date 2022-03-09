import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";

interface IProps {
  width?: number;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  btnRef?: React.MutableRefObject<null>;
  title?: string;
  footer?: any;
}

export default function MobileDrawer({
  width,
  isOpen,
  children,
  onClose,
  btnRef,
  title = "Menu",
  footer,
}: IProps) {
  const p = 15;
  return (
    <Flex w={width}>
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent alignItems="center">
          <DrawerCloseButton alignSelf="end" mx={p} my={p} />
          <DrawerHeader my={p}>
            <Text as="p"> {title} </Text>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
