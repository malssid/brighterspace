import { Flex, Text, Heading, Badge } from "@chakra-ui/react";
import Link from "next/link"

export default function TopicCard({ topic, cid }) {
  return (
    <Link href={`/course/${cid}/coursecontent/${topic.tid}`}>
        <Flex
          borderRadius="lg"
          boxShadow="lg"
          bg="blue.50"
          w="80"
          p={4}
          color="blue.900"
          mb="4"
          justify="center"
          align="center"
          direction="column"
          cursor="pointer"
        >
          <Heading>{topic.title}</Heading>
          <Text>{topic.body}</Text>
          <Badge mt={2} borderRadius="full" py={1} px={2} bg="blue.200">
            {topic.dateposted}
          </Badge>
        </Flex>
    </Link>
  );
}
