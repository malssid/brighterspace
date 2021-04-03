import { query } from "../../lib/db";

// Sends all courses to the client
// TODO: Only show user enrolled courses to logged in users
export default async function(req, res) {
  try {
    const results = await query("SELECT * FROM courses")
    return res.json(results)

  } catch (e) {
      res.status(500).json({ message: e.message })
  }
};

