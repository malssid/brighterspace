import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Flex,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SettingsIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";

export default function TopicSettings({ cid, tid, prevTitle, prevBody }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(prevTitle);
    setBody(prevBody);
  }, [isOpen]);

  async function RemoveTopic() {
    const result = await fetch("../../../api/coursecontent/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, tid }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      window.location.reload();
      toast({
        title: `Topic deleted!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    } else {
      // Display some type of error
    }
  }

  async function EditTopic() {
    const result = await fetch("../../../api/coursecontent/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, tid, title, body }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      window.location.reload();
      toast({
        title: `Topic edited!`,
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
      <Menu placement="bottom">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<SettingsIcon />}
          variant="outline"
          mb={3}
          size="sm"
        />
        <MenuList>
          <MenuItem onClick={RemoveTopic} icon={<DeleteIcon />}>
            Delete
          </MenuItem>
          <MenuItem onClick={onOpen} icon={<EditIcon />}>
            Edit
          </MenuItem>
        </MenuList>
      </Menu>

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
          <ModalHeader>Edit Topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Textarea onChange={(e) => setBody(e.target.value)} value={body} />
          </ModalBody>

          <ModalFooter>
            <Flex>
              <Button variant="ghost" onClick={onClose} mr={3}>
                Cancel
              </Button>

              <Spacer />
              <Button colorScheme="blue" onClick={EditTopic}>
                Edit Topic
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
