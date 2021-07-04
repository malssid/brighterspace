import { query } from "../../lib/db";
import shajs from "sha.js";

export default async function (req, res) {
  if (req.method === "POST") {
    // console.log(req.body)
    req.body.Password = shajs("sha256").update(req.body.Password).digest("hex");

    await query(
      "INSERT INTO people (First_name, Last_name, Email, Password) VALUES (?, ?, ?, ?)",
      [
        req.body.First_name,
        req.body.Last_name,
        req.body.Email,
        req.body.Password,
      ]
    )
      .then(() => {
        // res.status(200)
        // res.json({ok: true})
        // res.end()
        res.redirect("/");
      })
      .catch(() => {
        res.status(401);
        res.json({ ok: false, reason: "That account already exists" });
        res.end();
      });
  } else {
    // Not Signed in, user cannot create a grade item
    res.status(401);
  }
  res.end();
}
