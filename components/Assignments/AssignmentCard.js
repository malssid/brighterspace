import NextLink from "next/link";
import { Heading, Text, Badge, Box, Flex } from "@chakra-ui/layout";
import DeleteAssignment from "./DeleteAssignment";

const AssignmentCard = ({ isInstructor, assignment }) => {
  return (
    <Box
      borderRadius="lg"
      boxShadow="lg"
      bg="blue.50"
      p={4}
      w="80%"
      color="blue.900"
      mb="4"
      // height="150px">
    >
      {isInstructor && (
        <Flex align="center" direction="column">
          <DeleteAssignment cid={assignment.cid} assnid={assignment.assnid} />
        </Flex>
      )}
      <NextLink
        href={`/course/${assignment.cid}/assignment/${assignment.assnid}`}
        passHref
      >
        <a>
          <Flex align="center" direction="column" cursor="pointer">
            <Heading align="center">{assignment.title}</Heading>
            <Text align="center">{assignment.body}</Text>
          </Flex>
        </a>
      </NextLink>

      <Flex justify="center" wrap="wrap">
        <Badge
          borderRadius="full"
          m={1}
          py={1}
          px={2}
          color="blue.800"
          bg="blue.100"
        >
          Due {assignment.duedate}
        </Badge>

        {(assignment.submissiontype === "TEXT" ||
          assignment.submissiontype === "BOTH") && (
          <Badge
            borderRadius="full"
            m={1}
            py={1}
            px={2}
            color="blue.800"
            bg="blue.100"
          >
            Text submission
          </Badge>
        )}

        {(assignment.submissiontype === "FILE" ||
          assignment.submissiontype === "BOTH") && (
          <Badge
            borderRadius="full"
            m={1}
            py={1}
            px={2}
            color="blue.800"
            bg="blue.100"
          >
            File submission
          </Badge>
        )}
      </Flex>
    </Box>
  );
};

export default AssignmentCard;
