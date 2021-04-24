import { query } from "../../../lib/db";
import { getSession } from "next-auth/client";

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    if (session) {
      // @TODO: Check if user can submit (e.g., not past due date)

      const result = query(
        "REPLACE INTO submissions (cid, assnid, pid, body) VALUES (?, ?, ?, ?)",
        [req.body.cid, req.body.assnid, session.user.id, req.body.text]
      );

      if (result) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    } else {
      res.status(403);
      res.json({ status: false, reason: "Not logged in" });
    }
  } else {
    res.status(403);
    res.json({ status: false, reason: "Invalid http request" });
  }
}
