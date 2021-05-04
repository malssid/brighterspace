import { query } from "./db";

export async function isInstructor(pid, cid) {
  const memberships = await query(
    "SELECT * FROM memberships WHERE pid = ? AND cid = ? LIMIT 1",
    [pid, cid]
  );

  return memberships[0]?.role ? true : false;
}
