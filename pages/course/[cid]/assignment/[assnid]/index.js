import { query } from "../../../../../lib/db";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowUpIcon, CheckIcon } from "@chakra-ui/icons";

import {
  Heading,
  Text,
  Button,
  Textarea,
  Alert,
  AlertIcon,
  Flex,
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

export default function Assignment({
  assignment,
  membership,
  submissions,
  acceptingSubmissions,
}) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [submissionField, setSubmissionField] = useState("");

  const [submissionStatus, setSubmissionStatus] = useState(undefined);

  useEffect(() => {
    if (!session && !loading) {
      router.push("/account/sign-in");
    }
  }, []);

  function renderInput() {
    if (acceptingSubmissions) {
      if (assignment.submissiontype === "BOTH") {
        return (
          <Textarea
            size="lg"
            bg="blue.50"
            color="black"
            w="90%"
            fontSize="15px"
            onChange={(e) => setSubmissionField(e.target.value)}
            placeholder="Type your answer here..."
          ></Textarea>
        );
      } else if (assignment.submissiontype === "TEXT") {
        return (
          <Textarea
            size="lg"
            bg="blue.50"
            color="black"
            w="90%"
            fontSize="15px"
            onChange={(e) => setSubmissionField(e.target.value)}
            placeholder="Type your answer here..."
          ></Textarea>
        );
      }
    } else {
      return (
        <Textarea
          size="lg"
          bg="blue.50"
          color="black"
          w="90%"
          fontSize="15px"
          placeholder="Type your answer here..."
          isDisabled
        ></Textarea>
      );
    }
  }

  function renderSubmitBtn() {
    if (acceptingSubmissions) {
      return (
        <Button
          leftIcon={<ArrowUpIcon />}
          size="lg"
          mt={5}
          onClick={submitWork}
        >
          Submit/Save
        </Button>
      );
    } else {
      return (
        <Button
          leftIcon={<ArrowUpIcon />}
          size="lg"
          mt={5}
          isDisabled
        >
          Submit/Save
        </Button>
      );
    }
  }

  //@TODO: Client side valdation (e.g., do not accept empty work)
  async function submitWork() {
    const result = await fetch(`/api/assignments/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: assignment.cid,
        text: submissionField,
        assnid: assignment.assnid,
      }),
    });

    setSubmissionStatus(result.status);
    window.location.reload();
  }

  // @TODO: Make an functional error compontent, with some helpful hints/contact us
  if (membership.length === 0) {
    return (
      <Alert
        status="error"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="150px"
      >
        <AlertIcon />
        Access Denied. You are not in this course!
      </Alert>
    );
  }

  return (
    <>
      <Flex direction="column" w="full">
        <Heading size="3xl" align="center" color="blue.50" mt={4} mb={8}>
          {assignment.title}
        </Heading>
        <Text align="center" color="blue.100">
          {assignment.body}
        </Text>

        <Center>
          {submissionStatus === 200 && (
            <>
              <Box color="black">
                <Alert status="success">
                  <AlertIcon />
                  Your work was succesfully submitted!
                </Alert>
              </Box>
              <br />
            </>
          )}
        </Center>
        <Center color="blue.50" mt={4}>
          {renderInput()}
        </Center>
        <Center>
          {renderSubmitBtn()}
        </Center>
        {membership[0].role === 1 && (
          <>
            <Center>
              <Heading color="blue.50" mt={10}>
                Submissions
              </Heading>
            </Center>
            <Box p="10px" mt={2} color="blue.50">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="blue.50">Name</Th>
                    <Th color="blue.50">Dated Submitted</Th>
                    <Th color="blue.50">Submission</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {submissions &&
                    submissions.map((student, key) => (
                      <Tr key={key}>
                        <Td>
                          {student.First_name} {student.Last_name}
                        </Td>
                        <Td>{student.date}</Td>
                        <Td>{student.body}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>{" "}
          </>
        )}
      </Flex>
    </>
  );
} 

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const membership = await query(
    "SELECT cid, pid, role FROM memberships WHERE pid = ? AND cid = ?",
    [session.user.id, context.query.cid]
  );

  const assignment = await query(
    "SELECT * FROM assignments WHERE cid = ? AND assnid = ?",
    [context.query.cid, context.query.assnid]
  );

  const acceptingSubmissions = await query(
    "SELECT COUNT(assnid) as acceptingSubmissions FROM assignments WHERE cid = ? AND assnid = ? AND NOW() <= duedate",
    [context.query.cid, context.query.assnid]
  );

  // const submissions = await query(
  //   "SELECT First_name, Last_name, date, body FROM submissions, people WHERE assnid = ? AND submissions.pid = people.pid AND cid = ? ORDER BY date DESC",
  //   [context.query.assnid, context.query.cid]
  // );

  return {
    props: {
      assignment: assignment[0],
      acceptingSubmissions: acceptingSubmissions[0].acceptingSubmissions,
      membership,
      // submissions,
    },
  };
}
