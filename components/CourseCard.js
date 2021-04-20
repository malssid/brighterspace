import { Box, Heading, Text, Badge, Center } from "@chakra-ui/react";
import Link from "next/link";

export default function CourseCard({ name, cid, desc, term }) {
  return (
    <Link href={`/course/${cid}`}>
      <a>
        <Box
          borderRadius="lg"
          boxShadow="lg"
          bg="blue.50"
          p={4}
          w="100%"
          color="blue.900"
          mb="4"
          cursor="pointer"
        >
          <Heading textAlign="center">{name}</Heading>
          <Text textAlign="center">{desc}</Text>
          <Center>
            <Badge
              borderRadius="full"
              py={1}
              px={2}
              color="blue.800"
              bg="blue.100"
            >
              {term}
            </Badge>
          </Center>
        </Box>
      </a>
    </Link>
  );
}
