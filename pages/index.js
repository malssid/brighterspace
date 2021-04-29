import {
  Flex,
  Heading,
  Text,
  Button,
  Skeleton,
  Stack,
  SimpleGrid,
  Center,
  Box
} from "@chakra-ui/react";

import CourseCard from "../components/CourseCard";
import HomeDashboardMenu from "../components/NavMenus/HomeDashboard" 

import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { query } from "../lib/db";

export default function Home({ courses, setNavMenu }) {

  useEffect(() => {
    setNavMenu(<HomeDashboardMenu active="courses"/>)
  }, []);

  return (
    <Box mt={4}>
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
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: {
        permanent: false,
        destination: '/account/sign-in'
    } };
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
