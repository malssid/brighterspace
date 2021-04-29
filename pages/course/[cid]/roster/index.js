import { Box } from "@chakra-ui/layout";
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
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { query } from "../../../../lib/db";

const Roster = ({ roster, setPageTitle }) => {

  useEffect(() => {
    setPageTitle("Roster")
  }, [])

  return (
    <>
      <Box minHeight="100vh">
        <Box p="10px" color="blue.50" bg="blue.700" p="20px" margin="25px">
          <Text>Instructor settings</Text>
          <Checkbox defaultIsChecked>
            Allow students to view the class roster
          </Checkbox>
        </Box>
        <Box p="10px" mt={4} color="blue.50">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="blue.50">Name</Th>
                <Th color="blue.50">Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {roster.map((entry, key) => (
                <Tr key={key}>
                  <Td>{entry.First_name}</Td>
                  <Td>{entry.Email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Roster;

export async function getServerSideProps(context) {
  const roster = await query(
    "SELECT * FROM memberships, people WHERE memberships.pid = people.pid AND cid = ?",
    [context.query.cid]
  );

  return {
    props: {
      roster,
    },
  };
}
