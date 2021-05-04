import { query } from "../../../lib/db";
import { isInstructor } from "../../../lib/permissions";

import { getSession } from "next-auth/client";

export default async function (req, res) {
  const session = await getSession({ req });

  if (session && req.method === "POST") {
    // Signed in

        if(isInstructor(session.user.id, req.body.cid)){

            // Get the current assignment data
            let result = await query(
                "INSERT INTO gradeItems (cid, name, max_score) VALUES (?, ?, ?)",
                [req.body.cid, req.body.name, req.body.max_score]
            )
            
            res.status(200);
            res.json({status: true})

        }else{
            res.status(403);
            res.json({status: false, reason: "You do not have the correct role to perform this action."})
        }


    } else {
    // Not Signed in, user cannot create a grade item
    res.status(401);
  }
  res.end();

}