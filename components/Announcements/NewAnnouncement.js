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
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useState } from "react";

/**
 *
 * @param {props} props Should include a courseid and pid of the poster
 */
export default function NewAnnouncement({ cid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const [body, setBody] = useState("");

  const refreshData = () => router.replace(router.asPath);

  async function postAnnouncement() {
    const result = await fetch("../../../api/announcements/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, body }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      refreshData();
      toast({
        title: `Announcement posted!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    } else {
      // Display some type of error
    }
  }

  return (
    <>
      <Box pb="10px">
        <Button onClick={onOpen} size="md">
          Add Announcement
        </Button>
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
