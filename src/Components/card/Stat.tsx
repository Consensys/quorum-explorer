import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Flex,
  Skeleton,
} from "@chakra-ui/react";

interface IProps {
  label: string,
  value: string | number,
  icon: any,
  showPending: boolean
}

export const Stat = (props: IProps) => {
  const { label, value, icon, showPending } = props;
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection={{ base: "column", md: "row" }}
      px={{ base: "5", md: "6" }}
      py={{ base: "5", md: "6" }}
      borderRadius="lg"
      borderWidth={2}
      boxShadow={useColorModeValue("xs", "2xl")}
    >
      <VStack>
        <HStack mb={3}>
          <Box>{icon}</Box>
          <Text fontSize="lg" color="muted">
            {label}
          </Text>
        </HStack>
        {showPending ? (
          <Skeleton minW="45px" minH="35px" />
        ) : (
          <Heading>{value}</Heading>
        )}
      </VStack>
    </Flex>
  );
};
