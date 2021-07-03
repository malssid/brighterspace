import { useSession, getSession } from "next-auth/client";
import { useEffect } from "react";
import { query } from "../../../../lib/db";

import CourseDashNav from "../../../../components/NavMenus/CourseDashboard";

import GradeManager from "../../../../components/Grades/GradeManager";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const membership = await query(
    "SELECT cid, pid, role FROM memberships WHERE pid = ? AND cid = ? LIMIT 1",
    [session.user.id, context.query.cid]
  );

  const gradeItems = await query("SELECT * FROM gradeItems WHERE cid = ?", [
    context.query.cid,
  ]);

  console.log(gradeItems);

  // 0 is the code from students?
  if (membership[0].role === 0) {
    // Get the students grades as cache for GradeManager
  }

  return {
    props: {
      membership: membership[0],
      gradeItems,
    },
  };
}

function instructorManageGrades(props) {
  return (
    <>
      <GradeManager {...props} />
    </>
  );
}

function studentViewSelfGrades(props) {
  return <></>;
}

export default function Grades(props) {
  useEffect(() => {
    props.setNavMenu(
      <CourseDashNav cid={props.membership.cid} active="grades" />
    );
  }, []);

  if (props.membership.role === 1) {
    return instructorManageGrades(props);
  } else {
    return studentViewSelfGrades(props);
  }
}
