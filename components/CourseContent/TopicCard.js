import { Flex, Text, Heading, Badge, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import TopicSettings from "./TopicSettings";

export default function TopicCard({ isInstructor, topic }) {
  return (
    <Box
      borderRadius="lg"
      boxShadow="lg"
      bg="blue.50"
      p={4}
      w={{base: "90%", md:"80%", xl: "70%"}}
      color="blue.900"
      mb="4"
    >
      {isInstructor === 1 && (
        <Flex align="center" direction="column">
          <TopicSettings cid={topic.cid} tid={topic.tid} prevTitle={topic.title} prevBody={topic.body} />
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
            <Heading size="xl">{topic.title}</Heading>
            <Badge mt={2} borderRadius="full" py={1} px={2} bg="blue.200">
              {topic.dateposted}
            </Badge>
          </Flex>
        </a>
      </NextLink>
    </Box>
  );
}
