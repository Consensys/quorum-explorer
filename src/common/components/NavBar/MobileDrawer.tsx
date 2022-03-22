import React from "react";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Flex, Text, } from "@chakra-ui/react";

interface IProps {
  width?: number;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  btnRef?: React.MutableRefObject<null>;
  title?: string;
  footer?: any;
}

export default function MobileDrawer(props: IProps) {
  const p = 15;
  return (
    <Flex w={props.width}>
      <Drawer isOpen={props.isOpen} onClose={props.onClose} finalFocusRef={props.btnRef}>
        <DrawerOverlay />
        <DrawerContent alignItems="center">
          <DrawerCloseButton alignSelf="end" mx={p} my={p} />
          <DrawerHeader my={p}>
            <Text as="p"> {props.title} </Text>
          </DrawerHeader>
          <DrawerBody>{props.children}</DrawerBody>
          <DrawerFooter>{props.footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
