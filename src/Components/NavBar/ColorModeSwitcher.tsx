import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import React from 'react';

export const ColorModeSwitcher = ({...props}) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const moonElement = <FontAwesomeIcon icon={faMoon}/>
  const sunElement = <FontAwesomeIcon icon={faSun}/>
  const SwitchIcon = useColorModeValue(moonElement, sunElement);

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
        icon={SwitchIcon}
        {...props}
      />
    </>
  );
};