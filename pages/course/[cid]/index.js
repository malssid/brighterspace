import React, { useState } from "react";
import {
  Heading,
  Text,
  Box,
  Flex,
  List,
  Alert,
  AlertIcon,
  Center,
} from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/client";

import Announcement from "../../../components/Announcement";
import { query } from "../../../lib/db";

export default function CourseHome({ course, announcements, membership }) {
  return (
    <>
      {membership.length > 0 ? (
        <Flex mt={10} direction="column" align="center">
          <Heading size="2xl" color="blue.50">
            {course.Name}
          </Heading>
          <Text color="blue.100">{course.Description}</Text>
          <Flex direction="column" align="center">
            <Heading color="blue.50">Announcements </Heading>
            <List>
              {announcements.map((data, index) => (
                <Announcement key={index} data={data} />
              ))}
            </List>
          </Flex>
        </Flex>
      ) : (
        <Alert status="error" alignItems="center"
        justifyContent="center"
        textAlign="center" height="150px">
            <AlertIcon />
            Access Denied. You are not in this course!
        </Alert>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const membership = await query(
    "SELECT cid, pid, role FROM memberships WHERE pid = ? AND cid = ?",
    [session.user.id, context.query.cid]
  );

  console.log(membership);

  const announcements = await query(
    "SELECT aid, pid, cid, title, body FROM announcements WHERE cid = ?",
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
