import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import React from 'react';

export const ColorModeSwitcher = ({...props}) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        variant="outline"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={React.createElement(SwitchIcon)}
        {...props}
      />
    </>
  );
};