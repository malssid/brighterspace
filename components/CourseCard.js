import { Box, Heading, Text, Badge } from "@chakra-ui/react";

export default function CourseCard({ name, desc, term }) {
  return (
    <Box
      borderRadius="lg"
      boxShadow="lg"
      bg="blue.50"
      w="50"
      p={4}
      color="blue.900"
      mb="4"
    >
      <Heading>{name}</Heading>
      <Text>{desc}</Text>
      <Badge borderRadius="full" py={1} px={2} colorScheme="blue">
        {term}
      </Badge>
    </Box>
  );
}
