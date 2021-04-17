import React, { useEffect } from "react";
import {
  Heading,
  Text,
  Flex,
  List,
  Alert,
  AlertIcon,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";

import Announcement from "../../../components/Announcement";
import { query } from "../../../lib/db";

export default function CourseHome({ course, announcements, membership }) {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/account/sign-in");
    }
  }, []);

  // @TODO: adjust Skeleton once courseCard is final
  if (!session) {
    return (
      <>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </>
    );
  }

  return (
    <>
      {membership.length > 0 ? (
        <Flex mt={10} direction="column" align="center">
          <Heading size="4xl" color="blue.50" mb={4}>
            {course.Name}
          </Heading>
          <Text color="blue.100">{course.Description}</Text>
          <Flex direction="column" align="center" mt={10}>
            <Heading size="2xl" color="blue.50" mb={4}>
              Announcements{" "}
            </Heading>
            <List>
              {announcements.map((data, index) => (
                <Announcement key={index} data={data} />
              ))}
            </List>
          </Flex>
        </Flex>
      ) : (
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
      )}
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

  const announcements = await query(
    "SELECT * FROM announcements WHERE cid = ?",
    [context.query.cid]
  );

  const course = await query("SELECT * FROM courses WHERE courses.cid = ?", [
    context.query.cid,
  ]);

  return {
    props: {
      course: course[0],
      announcements,
      membership,
    },
  };
}
