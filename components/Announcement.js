import { Box, Badge, Text } from "@chakra-ui/react";

export default function Announcement({ data }) {
  return (
    <Box
      borderRadius="lg"
      boxShadow="lg"
      bg="blue.100"
      w="80"
      p={4}
      color="blue.900"
      mb="4"
      cursor="pointer"
    >
      <Text>{data.body}</Text>
      <Badge mt={2} borderRadius="full" py={1} px={2} bg="blue.200">Posted on Jan 1</Badge>
    </Box>
  );
}
