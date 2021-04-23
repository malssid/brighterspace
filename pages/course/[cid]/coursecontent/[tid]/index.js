import { query } from "../../../../../lib/db";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowUpIcon, CheckIcon } from "@chakra-ui/icons";

import { Heading, Text, Flex, Alert, AlertIcon } from "@chakra-ui/react";

export default function Topic({ topic, membership }) {
  const router = useRouter();
  const [session, loading] = useSession();

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
    <Flex direction="column" align="center">
      <Heading size="3xl" align="center" color="blue.50" mt={4} mb={8}>
        {topic.title}
      </Heading>
      <Text align="center" color="blue.100">
        {topic.body}
      </Text>
    </Flex>
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

  const topic = await query(
    "SELECT * FROM topic WHERE cid = ? AND tid = ?",
    [context.query.cid, context.query.tid]
  );

  return {
    props: {
      topic: topic[0],
      membership,
    },
  };
}
