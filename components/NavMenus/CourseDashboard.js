import React from "react";
import { Group, Link } from "../../components/Navbar";

import {
  SmallCloseIcon,
  HamburgerIcon,
  ChatIcon,
  ViewIcon,
} from "@chakra-ui/icons";

import { signOut } from "next-auth/client";
// import { ListIcon } from '@chakra-ui/layout'

function CourseDashboard({ active, cid }) {
  return (
    <>
      <Group title="Course Tools">
        <Link
          href={`/course/${cid}`}
          icon={<HamburgerIcon color="gray.500" />}
          text="Dashboard"
          active={active === "dashboard" ? true : false}
        />
        {/* <Link
                    href={`/course/${cid}/announcements`}
                    icon={<ChatIcon color="gray.500" />}
                    text="Announcements"
                    active={active === "announcements" ? true : false}
                    /> */}
        <Link
          href={`/course/${cid}/roster`}
          icon={<ViewIcon color="gray.500" />}
          text="Roster"
          active={active === "roster" ? true : false}
        />
        {/* <Link
                    href={`/course/${cid}/assignments`}
                    icon={<ViewIcon color="gray.500" />}
                    text="Assignments"
                    active={active === "assignments" ? true : false}
                /> */}
        <Link
          href={`/course/${cid}/grades`}
          icon={<ViewIcon color="gray.500" />}
          text="Grades"
          active={active === "grades" ? true : false}
        />
      </Group>
    </>
  );
}

export default CourseDashboard;
