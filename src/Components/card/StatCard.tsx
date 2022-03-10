import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { Stat } from "./Stat";
import { Cards } from "../Types/Nodes";
import { motion } from "framer-motion";

interface IProps {
  cards: Cards[];
  showPending: boolean;
}

const BoxMotion = motion(Box);

export default function StatCard(props: IProps) {
  const { cards, showPending } = props;
  return (
    <>
      <BoxMotion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        as="section"
        py={{ base: "4", md: "9" }}
      >
        <Container maxW={{ base: "container.sm", md: "container.xl" }}>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "5", md: "7" }}>
            {cards.map(({ label, value, icon }) => (
              <Stat
                key={label}
                label={label}
                value={value}
                icon={icon}
                showPending={showPending}
              />
            ))}
          </SimpleGrid>
        </Container>
      </BoxMotion>
    </>
  );
}
