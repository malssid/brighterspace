// Allows users with instructor permissions to edit the course shell's grade items

import { Heading, Box, Editable, EditablePreview, EditableInput, Alert } from "@chakra-ui/react";
import { Table, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";

import {useEffect, useState} from "react"

function GradeManager(props) {
    
    let gradeItems = props.gradeItems;

    // getSeverSideProps did not run or is empty, this data must be feteched manutally
    if(!gradeItems){

    }

    const [recentlyUpdated, setRecentlyUpdated] = useState();

    function postUpdatedItem(gid, updatedData){
      console.log(`Update ${gid} with`)
      console.log(updatedData)
      console.log(JSON.stringify({
        ...updatedData,
        gid: gid,
        cid: props.membership.cid
      }))
  
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
    
    return (
    <Box m="10px">
    <Box>
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
        {gradeItems && gradeItems.map((item, key) => {
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
    </Box>
    )
}

export default GradeManager