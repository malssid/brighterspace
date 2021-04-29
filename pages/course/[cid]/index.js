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
  Badge,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";

import NewAnnouncement from "../../../components/Announcements/NewAnnouncement";
import AnnouncementCard from "../../../components/Announcements/AnnouncementCard";
import NewAssignment from "../../../components/Assignments/NewAssignment";
import AssignmentCard from "../../../components/Assignments/AssignmentCard";
import { Group, Link as NavLink } from "../../../components/Navbar";

import NewTopic from "../../../components/CourseContent/NewTopic";
import TopicCard from "../../../components/CourseContent/TopicCard";
import { query } from "../../../lib/db";

// @TODO - refactor for seprate dashboards for student and teachers
export default function CourseHome({
  course,
  announcements,
  membership,
  assignments,
  coursecontent,
  grades,
  setPageTitle,
  setNavMenu,
}) {
  const router = useRouter();
  const [session, loading] = useSession();

  // setPageTitle("t")

  useEffect(() => {
    if (!session && !loading) {
      router.push("/account/sign-in");
    }
  }, []);

  useEffect(() => {
    setNavMenu(
      <Group title="Course">
        <NavLink
          href={`/course/${course.cid}`}
          text="Dashboard"
          active="true"
        ></NavLink>
        <NavLink
          href={`/course/${course.cid}/announcements`}
          text="Announcements"
        ></NavLink>
        <NavLink href={`/course/${course.cid}/roster`} text="Roster"></NavLink>
        <NavLink
          href={`/course/${course.cid}/assignments`}
          text="Assignments"
        ></NavLink>
      </Group>
    );
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
  if (membership === null || course === null) {
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
    <Flex
      direction="column"
      justify="center"
      borderRadius="md"
      px={4}
      m={4}
      w="full"
    >
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacingX={6}
        spacingY={6}
      >
        <Flex
          backgroundColor="blue.700"
          borderRadius="lg"
          boxShadow="md"
          p={8}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading textAlign="center" size="4xl" color="blue.50">
            {course.Name}
          </Heading>
          <Heading textAlign="center" size="md" mt={1} mb={{base: 4}} color="blue.100">
            {course.Description}
          </Heading>
          {membership[0].role === 1 && (
            <>
              <Divider borderColor="whiteAlpha.500" m="auto" />
              <Flex mt={{base: 4}} align="center" justify="center" direction="column">
                <Heading textAlign="center" size="lg" color="blue.100">
                  Instructor Tools
                </Heading>
                <Stack mt={2} align="center" direction={{base: "column", lg:"row", xl:"column", "2xl": "row"}}>
                  <NewTopic cid={course.cid} />
                  <NewAnnouncement cid={course.cid} />
                  <NewAssignment cid={course.cid} />{" "}
                </Stack>
              </Flex>
            </>
          )}
        </Flex>
        <Box backgroundColor="blue.700" boxShadow="md" borderRadius="lg" p={8}>
          <Heading textAlign="center" mb={2} size="2xl" color="blue.50">
            Course Content
          </Heading>
          <Divider mt={2} borderColor="whiteAlpha.500" m="auto" />
          <Stack mt={4} spacing={2} alignItems="center">
            {coursecontent.map((item, key) => (
              <TopicCard
                key={key}
                isInstructor={membership[0].role}
                topic={item}
              />
            ))}
          </Stack>
        </Box>
        <Box
          backgroundColor="blue.700"
          borderRadius="lg"
          boxShadow="md"
          p={8}
          textAlign="center"
        >
          <Heading textAlign="center" mb={2} fontSize={{base: "24", sm: "28", md:"36"}} color="blue.50">
            Announcements
          </Heading>
          <Divider mt={2} borderColor="whiteAlpha.500" m="auto" />
          <Stack mt={4} spacing={2} justifyContent="center" alignItems="center">
            {announcements.map((item, index) => (
              <AnnouncementCard
                key={index}
                isInstructor={membership[0].role}
                announcement={item}
              />
            ))}
          </Stack>
        </Box>
        <Box backgroundColor="blue.700" boxShadow="md" borderRadius="lg" p={8}>
          <Heading textAlign="center" mb={2} fontSize={{base: "28", md:"40"}} color="blue.50">
            Assignments
          </Heading>
          <Divider mt={2} borderColor="whiteAlpha.500" m="auto" />
          <Stack mt={4} spacing={2} justifyContent="center" alignItems="center">
            {assignments.map((item, key) => (
              <AssignmentCard
                key={key}
                isInstructor={membership[0].role}
                assignment={item}
              />
            ))}
          </Stack>
        </Box>
      </SimpleGrid>
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

  const grades = await query(
    "SELECT * FROM grades, gradeItems WHERE cid = ? AND pid = ? AND grades.gid = gradeItems.gid",
    [context.query.cid, session.user.id]
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
      grades,
    },
  };
}
