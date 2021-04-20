import { Box } from '@chakra-ui/layout'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Text,
    TableCaption,
    Checkbox, CheckboxGroup
  } from "@chakra-ui/react"
import React from 'react'
import {query} from "../../../../lib/db"

const Roster = ({roster}) => {
    return (
        <>
        <Box minHeight="100vh" bgColor="white">
        <Box p="10px" bgColor="blue.500" color="blue.50" p="20px" margin="25px">
            <Text>Instructor settings</Text>
            <Checkbox defaultIsChecked>Allow students to view the class roster</Checkbox>

        </Box>
        <Box p="10px" bgColor="whiteAlpha.500" margin="25px">

            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {roster.map((entry, key) =>
                        <Tr key={key}>
                            <Td>{entry.First_name}</Td>
                            <Td>{entry.Email}</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Box>
        </Box>
        </>
    )
}

export default Roster


export async function getServerSideProps(context) {

  
    const roster = await query(
      "SELECT * FROM memberships, people WHERE memberships.pid = people.pid AND cid = ?",
      [context.query.cid]
    );
  
    console.log(roster)

    return {
      props: {
        roster
      },
    };
  }
  