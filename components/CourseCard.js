import NextLink from "next/link";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Flex,
  Badge,
  Divider,
} from "@chakra-ui/react";

export default function CourseCard({
  name,
  cid,
  desc,
  term,
  nextAssignmentTitle,
  nextAssignmentDuedate,
  nextAssignmentAssnid,
}) {
  return (
    <Flex
      maxW={"445px"}
      w={"full"}
      bg="white"
      boxShadow={"xl"}
      rounded={"md"}
      p={4}
      overflow={"hidden"}
      align="center"
      justify="center"
      direction="column"
    >
      <NextLink href={`/course/${cid}`} passHref>
        <a>
          <Flex direction="column" cursor="pointer">
            <Heading
              color={"blue.900"}
              fontWeight={800}
              fontSize="4xl"
              letterSpacing={1.1}
              align="center"
            >
              {name}
            </Heading>
            <Text fontSize="sm" color={"blue.700"} align="center" mb={3}>
              {term}
            </Text>
            <Text color={"blue.800"} align="center">
              {desc}
            </Text>
          </Flex>
        </a>
      </NextLink>
      <Divider mt={2} borderColor="gray.500" />
      {nextAssignmentAssnid ? (
        <>
          <Heading
            mt={4}
            color={"blue.900"}
            fontSize="xl"
            letterSpacing={1.1}
            align="center"
          >
            Next Assignment Due
          </Heading>
          <NextLink
            href={`/course/${cid}/assignment/${nextAssignmentAssnid}`}
            passHref
          >
            <a>
              <Flex
                mt={4}
                boxShadow={"md"}
                align="center"
                bg="gray.100"
                p={3}
                borderRadius="5px"
                _hover={{ boxShadow: "lg" }}
                cursor="pointer"
              >
                <Text mr={4}>{nextAssignmentTitle}</Text>
                <Badge
                  borderRadius="full"
                  py={1}
                  px={2}
                  color="blue.800"
                  bg="blue.100"
                  align="center"
                >
                  Due {nextAssignmentDuedate}
                </Badge>
              </Flex>
            </a>
          </NextLink>
        </>
      ) : (
        <Heading
          mt={4}
          color={"blue.900"}
          fontWeight={800}
          fontSize="xl"
          letterSpacing={1.1}
          align="center"
        >
          No Assignments Due
        </Heading>
      )}
    </Flex>
  );
}
