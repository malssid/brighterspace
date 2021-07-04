import { query } from "../../../lib/db";
import { getSession } from "next-auth/client";

export default async function (req, res) {
  const session = await getSession({ req });

  if (session && req.method === "POST") {
    // Signed in

    // Determine if userid has privelges to update grade items

    const memberships = await query(
      "SELECT * FROM memberships WHERE pid = ? AND cid = ? LIMIT 1",
      [session.user.id, req.body.cid]
    );

    const role = memberships[0]?.role ?? null;

    if (role === 1) {
      // Get the current assignment data
      let gradebookItem = await query(
        "SELECT * FROM gradeItems WHERE gid = ? AND cid = ? LIMIT 1",
        [req.body.gid, req.body.cid]
      );

      for (var key in gradebookItem[0]) {
        if (req.body[key]) {
          gradebookItem[0][key] = req.body[key];
        }
      }

      const result = query("REPLACE INTO gradeItems VALUES (?, ?, ?, ?)", [
        gradebookItem[0].gid,
        gradebookItem[0].cid,
        gradebookItem[0].name,
        gradebookItem[0].max_score,
      ]);

      res.status(200);
      res.json({ status: true });
    } else {
      res.status(403);
      res.json({
        status: false,
        reason: "You do not have the correct role to perform this action.",
      });
    }
  } else {
    // Not Signed in, user cannot update a grade item
    res.status(401);
  }
  res.end();
}
