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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { useState } from "react";

export default function NewTopic({ cid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [posted, isPosted] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function postTopic() {
    const result = await fetch("../../../api/coursecontent/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, title, body }),
    });

    if (result.status === 200) {
      isPosted(true);
      setTimeout(() => {
        onClose();
      }, 1000);
      window.location.reload();
    } else {
      // Display some type of error
    }
  }

  return (
    <>
      <Box pb="10px">
        <Button onClick={onOpen}>Add Topic</Button>
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
          <ModalHeader>New Topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {posted && (
              <Alert status="success">
                <AlertIcon />
                Topic posted
              </Alert>
            )}
            <Textarea
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the topic title here"
            />
            <Textarea
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter the topic instructions here"
            />
          </ModalBody>

          <ModalFooter>
            <Flex>
              <Button variant="ghost" onClick={onClose} mr={3}>
                Cancel
              </Button>

              <Spacer />
              <Button colorScheme="blue" onClick={postTopic}>
                Post Topic
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
