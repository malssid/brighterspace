// Similar layout to GradeManger, but allows inserting/updating specific user's grades instead

import { Heading, Box, Editable, EditablePreview, EditableInput, Button } from "@chakra-ui/react";
import { Table, Thead, Tr, Th, Td, Tbody, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Container from "../Container"
import NewGradeItem from "./NewGradeItem"

import {useEffect, useState} from "react"
import Link from "next/link"
import useSWR from 'swr'


function GradebookEditor(props) {
    const toast = useToast()

    const [gradeItems, setGradeItems] = useState(props.gradeItems);

    // getSeverSideProps did not run or is empty, this data must be feteched manutally
    if(!gradeItems){

    }

    function postUpdatedItem(gid, pid, updatedData){
      fetch('/api/grades/update', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...updatedData,
          gid,
          cid: props.cid,
          pid
        })
      }).then(data => {
        if(data.status){
          toast({
            title: "Updated",
            description: "Grade has been updated",
            status: "success",
          })
        }else{
          toast({
            title: "Error ",
            description: "The grade could not be updated",
            status: "error",
          })
        }
      })
  
    }
    
    return (
    <Container>
    <Box>
      <Heading color="blue.50">
        <Link href={`/course/${props.gradeItemInfo[0].cid}/grades`}>Grade Items </Link> 
          &gt; {props.gradeItemInfo[0].name}</Heading>
    </Box>
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th>Grade</Th>
          </Tr>
        </Thead>
        <Tbody>
        {props.grades && props.grades.map((item, key) => {
          return (
            <Tr key={key} color="blue.50">
              <Td>{item.First_name} {item.Last_name} {props.gid}</Td>
              <Td>
                <Editable defaultValue={item.grade === null ? "Not assigned" : item.grade} onSubmit={nextval => postUpdatedItem(item.gid, item.pid, {grade: nextval})}>
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
    </Container>
    )
}

export default GradebookEditor