import NextLink from "next/link";
import { Heading, Text, Badge, Box, Flex } from "@chakra-ui/layout";
import AssignmentSettings from "./AssignmentSettings";

const AssignmentCard = ({ isInstructor, assignment }) => {
  return (
    <Box
      borderRadius="lg"
      boxShadow="lg"
      bg="blue.50"
      p={4}
      w={{ base: "90%", md: "80%", xl: "70%" }}
      color="blue.900"
      mb="4"
      // height="150px">
    >
      {isInstructor === 1 && (
        <Flex align="center" direction="column">
          <AssignmentSettings
            cid={assignment.cid}
            assnid={assignment.assnid}
            prevTitle={assignment.title}
            prevBody={assignment.body}
            prevSubmissiontype={assignment.submissiontype}
          />
        </Flex>
      )}
      <NextLink
        href={`/course/${assignment.cid}/assignment/${assignment.assnid}`}
        passHref
      >
        <a>
          <Flex align="center" direction="column" cursor="pointer">
            <Heading align="center" size="xl">
              {assignment.title}
            </Heading>
          </Flex>

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
        </a>
      </NextLink>
    </Box>
  );
};

export default AssignmentCard;
