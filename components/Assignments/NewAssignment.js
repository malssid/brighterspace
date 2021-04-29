import {
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Spacer,
  Select,
  useToast
} from "@chakra-ui/react";

import { useState } from "react";

export default function NewAssignment({ cid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submissiontype, setSubmissionType] = useState("");
  const duedate = "2021-05-05 00:00:00" // Add state for date/time of the duedate

  async function postAssignment() {
    const result = await fetch("../../../api/assignments/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, title, body, duedate, submissiontype }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      window.location.reload();
      toast({
        title: `Assignment posted!`,
        status: "success",
        position: "top",
        isClosable: true,
      })
    } else {
      // Display some type of error
    }
  }

  return (
    <>
      <Box pb="10px">
        <Button onClick={onOpen}>Add Assignment</Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your assignment title here"
              
            />
            <Textarea
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter your assignment instructions here"
            />
            <Select
              value={submissiontype}
              onChange={(e) => setSubmissionType(e.target.value)}
              placeholder="Select type"
            >
              <option value="TEXT">Text</option>
              <option value="FILE">File</option>
              <option value="BOTH">Both</option>
            </Select>
            {/*Add date/time picker for duedate*/}
          </ModalBody>

          <ModalFooter>
            <Flex>
              <Button variant="ghost" onClick={onClose} mr={3}>
                Cancel
              </Button>

              <Spacer />
              <Button colorScheme="blue" onClick={postAssignment}>
                Post Assignment
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
