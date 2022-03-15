import React, { Component } from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import NodeCard from "./NodeCard";
import { QuorumStatCard } from "../Types/Nodes";
import { motion } from "framer-motion";
const BoxMotion = motion(Box);

interface IProps {
  stats: QuorumStatCard[];
  statusText: string;
}

export default function NodeOverview ({ stats, statusText } : IProps) {

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
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            gap={{ base: "5", md: "7" }}
          >
            {stats.map(({ label, value, icon }) => (
              <NodeCard
                key={label}
                title={label}
                text={value}
                icon={icon}
                statusText={statusText}
              />
            ))}
          </SimpleGrid>
        </Container>
      </BoxMotion>
    </>
  );
}
