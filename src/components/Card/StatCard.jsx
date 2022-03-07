import React from 'react';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { Stat } from './Stat';

export default function StatCard(props) {
  const { cards } = props;
  return (
    <>
      <Box as="section" py={{ base: '4', md: '9' }}>
        <Container maxW={{ base: 'container.sm', md: 'container.xl' }}>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: '5', md: '7' }}>
            {cards.map(({ label, value, icon }) => (
              <Stat key={label} label={label} value={value} icon={icon} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
