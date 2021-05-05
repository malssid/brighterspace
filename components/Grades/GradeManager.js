// Allows users with instructor permissions to edit the course shell's grade items

import {
  Heading,
  Box,
  Editable,
  EditablePreview,
  EditableInput,
  Button,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Table, Thead, Tr, Th, Td, Tbody, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Container from "../Container";
import NewGradeItem from "./NewGradeItem";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

function GradeManager(props) {
  const toast = useToast();

  const [gradeItems, setGradeItems] = useState(props.gradeItems);

  // getSeverSideProps did not run or is empty, this data must be feteched manutally
  if (!gradeItems) {
  }

  function postUpdatedItem(gid, updatedData) {
    fetch("/api/grades/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedData,
        gid: gid,
        cid: props.membership.cid,
      }),
    }).then((data) => {
      if (data.status) {
        toast({
          title: "Updated",
          description: "Grade item has been updated",
          status: "success",
        });
      } else {
        toast({
          title: "Error ",
          description: "The grade item could not be updated",
          status: "error",
        });
      }
    });
  }

  return (
    <Flex direction="column" justify="center" borderRadius="md" m={4} w="full">
      <Box>
        <Heading align="center" color="blue.50" size="2xl" mb={4}>
          Grade Items
        </Heading>
      </Box>
      <Center>
        <NewGradeItem cid={props.membership.cid} />
      </Center>

      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Max Score</Th>
              <Th>Enter Grades</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gradeItems &&
              gradeItems.map((item, key) => {
                return (
                  <Tr key={key} color="blue.50">
                    <Td>
                      <Editable
                        defaultValue={item.name}
                        onSubmit={(nextval) =>
                          postUpdatedItem(item.gid, { name: nextval })
                        }
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable
                        defaultValue={item.max_score}
                        onSubmit={(nextval) =>
                          postUpdatedItem(item.gid, { max_score: nextval })
                        }
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td>
                      <Link
                        href={`/course/${props.membership.cid}/grades/${item.gid}`}
                      >
                        <a>
                          <Button colorScheme="blue">Enter/Edit Grades</Button>
                        </a>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}

export default GradeManager;
