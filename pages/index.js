import {
  Flex,
  Heading,
  Text,
  Button,
  Skeleton,
  Stack,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import CourseCard from "../components/CourseCard";
import { Group, Link } from "./../components/NextGenNavbar"


import moment from "moment";

import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { query } from "../lib/db";

export default function Home({ courses, setNavMenu }) {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/account/sign-in");
    }
  }, [loading]);

  useEffect( () => {
    setNavMenu(
      <Group title="Course">
        <Link href="/" text="Your Courses" active="true"></Link>
      </Group>
    )
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
    <Center mt={4} ml={{ base: "4", md: "0" }}>
      {/* <SimpleGrid columns={{sm: 1, lg: 2}} spacing="10px"> */}
      <SimpleGrid minChildWidth="200px" spacing="10px">
        {courses.map((course, idx) => (
          <CourseCard
            key={idx}
            cid={course.cid}
            name={course.Name}
            desc={course.Description}
            term={course.Term}
            nextAssignmentTitle={course.title}
            nextAssignmentDuedate={course.duedate}
            nextAssignmentAssnid={course.assnid}
          />
        ))}
      </SimpleGrid>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const courses = await query(
    "select nextAssn.cid, nextAssn.assnid, nextAssn.title, nextAssn.duedate, courses.Name, courses.Description, courses.Term from (select * from assignments order by duedate asc) as nextAssn, courses, memberships WHERE memberships.pid = ? AND memberships.cid = courses.cid AND courses.cid = nextAssn.cid AND NOW() <= duedate group by cid",
    [session.user.id]
  );

  return {
    props: {
      courses,
      session,
    },
  };
}
