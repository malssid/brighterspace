import { useEffect } from "react";

import { Group, Link } from "./../../../../components/Navbar";

const Test = (props) => {
  // Must be nested within useEffect to avoid re-rendering errors
  useEffect(() => {
    props.setNavMenu(
      <Group title="Course">
        <Link href="/" text="Home"></Link>
        <Link href="/" text="Example Page" active="true"></Link>
      </Group>
    );
  }, []);

  return (
    <>
      <p>This page is only for demonstration</p>
    </>
  );
};

export default Test;
