import React from "react";
import { Group, Link } from "../../components/Navbar";

import {
  SmallCloseIcon,
  HamburgerIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";

import { signOut } from "next-auth/client";

import { useColorMode } from "@chakra-ui/react";

function HomeDashboard({ active }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Group title="Your Stuff">
        <Link
          icon={<HamburgerIcon color="gray.500" />}
          href="/"
          text="Your Courses"
          active={active === "courses" ? true : false}
        ></Link>
      </Group>
      <Group title="Account">
        <Link
          icon={<SmallCloseIcon color="gray.500" />}
          text="Sign Out"
          onClick={signOut}
        ></Link>
      </Group>
      <Group title="System">
        <Link
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          text={`Toggle ${colorMode === "light" ? "Dark" : "Light"}`}
          onClick={toggleColorMode}
        ></Link>
      </Group>
    </>
  );
}

export default HomeDashboard;
