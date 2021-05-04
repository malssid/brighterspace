// Allows an instructor role to import/edit grades for all users

import { useSession, getSession } from "next-auth/client";
import { useEffect } from "react"

import { query } from "../../../../lib/db";
import { isInstructor } from "../../../../lib/permissions"

import CourseDashNav from "../../../../components/NavMenus/CourseDashboard"
import GradebookEditor from '../../../../components/Grades/GradebookEditor'


export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session || !isInstructor(session.user.id, context.query.cid)) {
      return { props: {} };
    }
  
    const membership = await query(
      "SELECT cid, pid, role FROM memberships WHERE pid = ? AND cid = ? LIMIT 1",
      [session.user.id, context.query.cid]
    );

    const gradeItemInfo = await query(
        "SELECT * FROM gradeItems WHERE gid = ?",
        [context.query.gid]
      )

    const grades = await query(
        `SELECT 
            DISTINCT
            A.cid, 
            A.pid, 
            (SELECT ?) AS gid,
            (SELECT grade FROM grades WHERE pid = A.pid AND gid = ? LIMIT 1) AS grade,
            (SELECT First_name FROM people WHERE pid = A.pid LIMIT 1) as First_name,
            (SELECT Last_name FROM people WHERE pid = A.pid LIMIT 1) as Last_name  
            FROM memberships A, grades B 
            WHERE A.cid = ?`,
        [context.query.gid, context.query.gid, context.query.cid]
      )

      console.log(grades)
  
    return {
      props: {
        membership: membership[0],
        cid: context.query.cid,
        gid: context.query.gid,
        gradeItemInfo,
        grades
      },
    };
  }
  

export default function GradebookEditorPage(props){
  useEffect(() => {
    props.setNavMenu(<CourseDashNav cid={props.membership.cid} active="grades" />);
  }, []);

  return <GradebookEditor {...props}/>;
}

