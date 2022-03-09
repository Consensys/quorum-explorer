import React from 'react';
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
} from '@chakra-ui/react';

interface IProps {
  placement?: any,
  width?: number,
  isOpen: boolean,
  children: any,
  onClose: any,
  btnRef?: any,
  title?: string,
  footer?: any,
  finalFocusRef: any
}

export default function MobileDrawer({placement = 'right',
  width,
  isOpen,
  children,
  onClose,
  btnRef,
  title = 'Menu',
  footer,
  finalFocusRef
  
}:IProps) {
  const p = 15;
  return (
    <Flex w={width}>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
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