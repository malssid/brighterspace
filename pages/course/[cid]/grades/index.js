import { Heading, Box, Editable, EditablePreview, EditableInput, Alert } from "@chakra-ui/react";
import { Table, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";

import { useSession, getSession } from "next-auth/client";
import { query } from "../../../../lib/db";

import {useEffect, useState} from "react"


function instructorManageGrades(props){

  const [recentlyUpdated, setRecentlyUpdated] = useState();

  function postUpdatedItem(gid, updatedData){
    console.log(`Update ${gid} with ${updatedData}`)

    fetch('/api/grades/info', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...updatedData,
        gid: gid,
        cid: props.membership.cid
      })
    }).then(data => {
      if(data.status){
        setRecentlyUpdated(true);
        setTimeout(function(){
          setRecentlyUpdated(undefined);
        }, 3000)
      }else{
        alert("Error updating data")
      }
    })

  }

  return (<>
    <Box m="10px">
      <Heading color="blue.50">Grade Items</Heading>
    </Box>
    <Box>
      {recentlyUpdated && <Alert>Update successful!</Alert>}
    </Box>
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Max Score</Th>
          </Tr>
        </Thead>
        <Tbody>
        {props.gradeItems.map((item, key) => {
          return (
            <Tr key={key} color="blue.50">
              <Td>
                <Editable defaultValue={item.name} onSubmit={nextval => postUpdatedItem(item.gid, {name: nextval})}>
                  <EditablePreview/>
                  <EditableInput/>
                </Editable>
              </Td>
              <Td>
                <Editable defaultValue={item.max_score} onSubmit={nextval => postUpdatedItem(item.gid, {max_score: nextval})}>
                  <EditablePreview/>
                  <EditableInput/>
                </Editable>
              </Td>
            </Tr>
          )
        })}

        </Tbody>
        </Table>
    </Box>

  </>)
}

function studentViewSelfGrades(props){
  return (<>


  </>)
}


export default function Grades(props){
  if(props.membership.role === 1){
    return instructorManageGrades(props);
  }else{
    return studentViewSelfGrades(props);
  }
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      return { props: {} };
    }
  
    const membership = await query(
      "SELECT cid, pid, role FROM memberships WHERE pid = ? AND cid = ? LIMIT 1",
      [session.user.id, context.query.cid]
    );

    const gradeItems = await query(
      "SELECT * FROM gradeItems WHERE cid = ?",
      [context.query.cid]
    )


  
  
    return {
      props: {
        membership: membership[0],
        gradeItems
      },
    };
  }
  