import { Flex } from "@chakra-ui/react";
import CourseCard from "../components/CourseCard";
import { getSession } from "next-auth/client";

import { query } from "../lib/db";

const courselist = ({ courses, session }) => {
  return (
    <Flex direction="column" align="center">
      {courses.map((course) => (
        <CourseCard
          id={course.cid}
          name={course.Name}
          desc={course.Description}
          term={course.Term}
        />
      ))}
    </Flex>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const courses = await query(
    "SELECT courses.cid as cid, Name, Description, Term FROM memberships, courses WHERE memberships.pid = ? AND memberships.cid = courses.cid",
    [session.user.id]
  );

  return {
    props: {
      courses,
      session,
    },
  };
}

export default courselist;
