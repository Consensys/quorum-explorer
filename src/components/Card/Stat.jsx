import {
  Box,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
  HStack,
  VStack,
  Flex,
} from '@chakra-ui/react';

import * as React from 'react';

export const Stat = props => {
  const { label, value, icon, ...boxProps } = props;
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection={{ base: 'column', md: 'row' }}
      px={{ base: '5', md: '6' }}
      py={{ base: '5', md: '6' }}
      borderRadius="lg"
      borderWidth={2}
      boxShadow={useColorModeValue('xs', '2xl')}
      {...boxProps}
    >
      <VStack>
        <HStack>
          <Box>{icon}</Box>
          <Text fontSize="lg" color="muted">
            {label}
          </Text>
        </HStack>
        <VStack>
          <Heading size={useBreakpointValue({ base: 'sm', md: 'lg' })}>
            {value}
          </Heading>
        </VStack>
      </VStack>
    </Flex>
  );
};
