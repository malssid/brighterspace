import { Flex, Text, Heading, Badge, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import DeleteTopic from "./DeleteTopic";

export default function TopicCard({ isInstructor, topic }) {
  return (
    <Box
      borderRadius="lg"
      boxShadow="lg"
      bg="blue.50"
      w="80"
      p={4}
      color="blue.900"
      mb="4"
    >
      {isInstructor && (
        <Flex align="center" direction="column">
          <DeleteTopic cid={topic.cid} tid={topic.tid} />
        </Flex>
      )}
      <NextLink
        href={`/course/${topic.cid}/coursecontent/${topic.tid}`}
        passHref
      >
        <a>
          <Flex
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
        </a>
      </NextLink>
    </Box>
  );
}
