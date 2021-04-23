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
  SimpleGrid,
  Box,
  Button,
} from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Announcement,
  NewAnnouncement,
} from "../../../components/Announcements/Announcement";
import NewAssignment from "../../../components/Assignments/NewAssignment";
import AssignmentCard from "../../../components/Assignments/AssignmentCard";
import NewTopic from "../../../components/CourseContent/NewTopic";
import TopicCard from "../../../components/CourseContent/TopicCard"
import { query } from "../../../lib/db";

export default function CourseHome({
  course,
  announcements,
  membership,
  assignments,
  coursecontent
}) {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session && !loading) {
      router.push("/account/sign-in");
    }
  }, []);

  // @TODO: Make a functional loading component?
  if (loading) {
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

  // @TODO: Make an functional error compontent, with some helpful hints/contact us
  if (membership.length === 0 || course === null) {
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
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="10px">
        <Box bgColor="whiteAlpha.100">
          <Flex direction="column" align="center" mt={6}>
            <Heading size="4xl" color="blue.50" mb={4}>
              {course.Name}
            </Heading>
            <Text color="blue.100">{course.Description}</Text>

            <Link href={`/course/${course.cid}/roster`}>
              <a>
                <Button>Roster</Button>
              </a>
            </Link>

            <Text color="blue.100">Button/Link to Gradebook</Text>

            <Text color="blue.100">Button/Link to Discussion posts?</Text>

            <Heading size="2xl" color="blue.50" mb={4} mt={4}>
              Course Content
            </Heading>
            {membership[0].role === 1 && <NewTopic cid={course.cid} />}
            {coursecontent.map((item, key) => (
              <TopicCard key={key} cid={course.cid} topic={item} />
            ))}
          </Flex>
        </Box>

        <Box bgColor="whiteAlpha.100">
          <Flex direction="column" align="center" mt={6}>
            <Heading size="2xl" color="blue.50" mb={4}>
              Announcements
            </Heading>
            {membership[0].role === 1 && <NewAnnouncement cid={course.cid} />}
            <List>
              {announcements.map((data, index) => (
                <Announcement key={index} data={data} />
              ))}
            </List>
          </Flex>
        </Box>
        <Box bgColor="whiteAlpha.100">
          <Flex direction="column" align="center" mt={6}>
            <Heading size="2xl" color="blue.50" mb={4}>
              Assignments
            </Heading>
            {membership[0].role === 1 && <NewAssignment cid={course.cid} />}
            {/* <AssignmentCard cid={course.cid} assignment={assignments[0]} /> */}
            {assignments.map((item, key) => (
              <AssignmentCard key={key} cid={course.cid} assignment={item} />
            ))}
          </Flex>
        </Box>
      </SimpleGrid>
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
    "SELECT * FROM announcements WHERE cid = ? ORDER BY dateposted DESC",
    [context.query.cid]
  );

  const assignments = await query(
    "SELECT * FROM assignments WHERE cid = ? ORDER BY duedate ASC",
    [context.query.cid]
  );

  const coursecontent = await query(
    "SELECT * FROM topic WHERE cid = ? ORDER BY dateposted DESC",
    [context.query.cid]
  );

  const course = await query("SELECT * FROM courses WHERE courses.cid = ?", [
    context.query.cid,
  ]);

  return {
    props: {
      course: course[0] || null,
      announcements,
      membership,
      assignments,
      coursecontent,
    },
  };
}
