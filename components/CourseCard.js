import { Box, Heading, Text, Badge } from "@chakra-ui/react";
import Link from "next/link";

export default function CourseCard({ name, cid, desc, term }) {
  return (
    <Link href={`/course/${cid}`}>
      <Box
        borderRadius="lg"
        boxShadow="lg"
        bg="blue.50"
        w="50%"
        p={4}
        color="blue.900"
        mb="4"
        cursor="pointer"
      >
        <Heading>{name}</Heading>
        <Text>{desc}</Text>
        <Badge borderRadius="full" py={1} px={2} color="blue.800" bg="blue.100">
          {term}
        </Badge>
      </Box>
    </Link>
  );
}
