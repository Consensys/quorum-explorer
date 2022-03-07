import { useDisclosure, Flex, Button, VStack } from '@chakra-ui/react';
import MobileDrawer from './MobileDrawer';
import { IoMdMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { data } from './header';
import React from 'react';

export default function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Flex display={{ base: 'flex', md: 'none' }}>
      <Button ref={btnRef} onClick={onOpen}>
        <IoMdMenu size="26px" />
      </Button>
      <MobileDrawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <VStack alignItems="left">
          {data.map((item, i) => (
            <Link key={i} to={item['label'].toLowerCase()}>
              <Button leftIcon={item['icon']} variant="text" onClick={onClose}>
                {item.label}
              </Button>
            </Link>
          ))}
        </VStack>
      </MobileDrawer>
    </Flex>
  );
}
