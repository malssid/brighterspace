import { query } from "../../../lib/db";
import { isInstructor } from "../../../lib/permissions";

import { getSession } from "next-auth/client";

export default async function (req, res) {
  const session = await getSession({ req });

  if (session && req.method === "POST") {
    // Signed in

        if(isInstructor(session.user.id, req.body.cid)){

            let [gradebookItem] = await query(
                "SELECT * FROM grades WHERE gid = ? AND pid = ? LIMIT 1",
                [req.body.gid, req.body.pid]
            )

            // Cast gradebook time to an object, if needed
            if(!gradebookItem){
                gradebookItem = {}
            }
            
            // Replace any updated values in the grade entry
            for (var key in req.body) {
                gradebookItem[key] = req.body[key] 
            }

            const result = query(
                "REPLACE INTO grades VALUES (?, ?, ?, ?)",
                [req.body.pid, req.body.gid, gradebookItem.grade, gradebookItem.comment]
              );
            
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