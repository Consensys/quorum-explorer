import React from 'react';
import { Heading, Divider } from '@chakra-ui/react';

export default function PageHeader({ HeadingName }) {
  return (
    <>
      <center>
        <Heading as="h1" size="xl" m={3}>
          {HeadingName}
        </Heading>
        <Divider maxW="40vw" />
      </center>
    </>
  );
}
