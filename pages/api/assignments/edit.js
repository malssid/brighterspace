import { query } from "../../../lib/db";
import { getSession } from "next-auth/client";

export default async function (req, res) {
  const session = await getSession({ req });

  if (session) {
    // Signed in

    // Determine if userid has privelges to post annocuments in the cid

    const memberships = await query(
      "SELECT * FROM memberships WHERE pid = ? AND cid = ? LIMIT 1",
      [session.user.id, req.body.cid]
    );

    // console.log([session.user.id, req.body.cid])

    const role = memberships[0]?.role ?? null;

    // console.log(memberships)

    if (role === 1) {
      const result = await query(
        "UPDATE `assignments` SET title = ?, body = ?, submissiontype = ? WHERE cid = ? AND assnid = ?",
        [
          req.body.title,
          req.body.body,
          req.body.submissiontype,
          req.body.cid,
          req.body.assnid
        ]
      );

      if (result) {
        res.json({ status: 200 });
      } else {
        res.status(500);
        res.json({ status: 500, reason: "Unknown database error" });
      }
    } else {
      res.status(403);
      res.json({
        status: 403,
        reason:
          "You do not have the correct permissions to perform this action",
      });
    }
  } else {
    // Not Signed in, user cannot create a new annoucment
    res.status(401);
  }
  res.end();
}
