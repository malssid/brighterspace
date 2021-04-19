import { query } from "../../../../../lib/db";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Spacer,
  Alert,
  AlertIcon,
  Flex,
  Box,
  Center
} from "@chakra-ui/react";

export default function Assignment({ assignment, membership }) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [submissionField, setSubmissionField] = useState("");

  useEffect(() => {
    if (!session && !loading) {
      router.push("/account/sign-in");
    }
  }, []);

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
      <Flex direction="column" align="center">
        <Heading align="center" color="blue.50" mt={4} mb={8}>
          {assignment.title}
        </Heading>
        <Text align="center" color="blue.100">
          {assignment.body}
        </Text>
      </Flex>
      <Center color="blue.50" mt={4}>
        {assignment.submissiontype === "BOTH" && (
          <Textarea
            size="lg"
            bg="blue.50"
            color="black"
            w="90%"
            fontSize="15px"
            onChange={(e) => setSubmissionField(e.target.value)}
          ></Textarea>
        )}
      </Center>
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
    [context.query.cid, context.query.assignmentid]
  );

  console.log(assignment);

  return {
    props: {
      assignment: assignment[0],
      membership,
    },
  };
}
