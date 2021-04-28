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

/**
 *
 * @param {props} props Should include a courseid and pid of the poster
 */
export default function NewAnnouncement({ cid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [posted, isPosted] = useState(false);
  const [body, setBody] = useState("");

  async function postAnnouncement() {
    const result = await fetch("../../../api/announcements/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, body }),
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
        <Button onClick={onOpen}>Add Announcement</Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {posted && (
              <Alert status="success">
                <AlertIcon />
                Announcement posted
              </Alert>
            )}
            <Textarea
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter your announcement text here"
            />
          </ModalBody>

          <ModalFooter>
            <Flex>
              <Button variant="ghost" onClick={onClose} mr={3}>
                Cancel
              </Button>

              <Spacer />
              <Button colorScheme="blue" onClick={postAnnouncement}>
                Post Announcement
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
