import {
  Flex,
  Heading,
  Text,
  Button,
  Skeleton,
  Stack,
  SimpleGrid,
  Center
} from "@chakra-ui/react";
import CourseCard from "../components/CourseCard";

import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { query } from "../lib/db";

export default function Home({ courses }) {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/account/sign-in");
    }
  }, [loading]);

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
    <Center mt={4}>     
      {/* <SimpleGrid columns={{sm: 1, lg: 2}} spacing="10px"> */}
        <SimpleGrid minChildWidth="200px" spacing="10px">
      {courses.map((course, idx) => (
        <CourseCard
          key={idx}
          cid={course.cid}
          name={course.Name}
          desc={course.Description}
          term={course.Term}
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
