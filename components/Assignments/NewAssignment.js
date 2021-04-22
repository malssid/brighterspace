import {
  Flex,
  Badge,
  Text,
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from "@chakra-ui/react";

import { useState } from "react";

export default function NewAssignment({ cid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [posted, isPosted] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submissiontype, setSubmissionType] = useState("");
  const duedate = "2021-05-07 00:00:00" // Add state for date/time of the duedate

  async function postAssignment() {
    const result = await fetch("../../../api/assignments/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, title, body, duedate, submissiontype }),
    });

    if (result.status === 200) {
      isPosted(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      // Display some type of error
    }
  }

  return (
    <>
      <Box pb="10px">
        <Button onClick={onOpen}>New Assignment</Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {posted && (
              <Alert status="success">
                <AlertIcon />
                Assignment posted
              </Alert>
            )}
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
