import {
  Flex,
  Heading,
  Text,
  Button,
  Skeleton,
  Stack,
  SimpleGrid,
  Center,
  Box,
} from "@chakra-ui/react";

import CourseCard from "../components/CourseCard";
import HomeDashboardMenu from "../components/NavMenus/HomeDashboard";

import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { query } from "../lib/db";
import { m } from "framer-motion";

export default function Home({
  coursesWithNewAssn,
  coursesWithoutNewAssn,
  coursesWithoutAssn,
  setNavMenu,
}) {
  useEffect(() => {
    setNavMenu(<HomeDashboardMenu active="courses" />);
  }, []);

  return (
    <Box mt={4} ml={{ base: 0, md: 4 }}>
      {/* <SimpleGrid columns={{sm: 1, lg: 2}} spacing="10px"> */}
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="10px">
        {coursesWithNewAssn.map((course, idx) => (
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
        {coursesWithoutNewAssn.map((course, idx) => (
          <CourseCard
            key={idx}
            cid={course.cid}
            name={course.Name}
            desc={course.Description}
            term={course.Term}
          />
        ))}
        {coursesWithoutAssn.map((course, idx) => (
          <CourseCard
            key={idx}
            cid={course.cid}
            name={course.Name}
            desc={course.Description}
            term={course.Term}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/account/sign-in",
      },
    };
  }

  const coursesWithNewAssn = await query(
    "select nextAssn.cid, nextAssn.assnid, nextAssn.title, nextAssn.duedate, courses.Name, courses.Description, courses.Term from (select * from assignments order by duedate asc) as nextAssn, courses, memberships WHERE memberships.pid = ? AND memberships.cid = courses.cid AND courses.cid = nextAssn.cid AND NOW() <= duedate group by cid",
    [session.user.id]
  );

  const coursesWithoutNewAssn = await query(
    "select nextAssn.cid, nextAssn.assnid, nextAssn.title, nextAssn.duedate, courses.Name, courses.Description, courses.Term from (select * from assignments order by duedate asc) as nextAssn, courses, memberships WHERE memberships.pid = ? AND memberships.cid = courses.cid AND courses.cid = nextAssn.cid AND NOW() > duedate group by cid",
    [session.user.id]
  );

  const coursesWithoutAssn = await query(
    "select * from(select courses.Name, courses.cid, courses.Description, courses.Term, count(assignments.cid) as numAssn from courses left join assignments on courses.cid = assignments.cid, memberships where memberships.pid = ? AND memberships.cid = courses.cid group by courses.cid) as noAssn where noAssn.numAssn = 0",
    [session.user.id]
  );

  return {
    props: {
      coursesWithNewAssn,
      coursesWithoutNewAssn,
      coursesWithoutAssn,
      session,
    },
  };
}
