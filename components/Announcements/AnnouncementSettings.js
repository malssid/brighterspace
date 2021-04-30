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

import { useRouter } from "next/router"
import { useState, useEffect } from "react";

export default function AnnouncementSettings({ cid, aid, prevBody }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const [body, setBody] = useState("");

  useEffect(() => {
    setBody(prevBody);
  }, [isOpen]);

  const refreshData = () => router.replace(router.asPath);

  async function RemoveAnnouncement() {
    const result = await fetch("../../../api/announcements/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, aid }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      refreshData();
      toast({
        title: `Announcement deleted!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    } else {
      // Display some type of error
    }
  }

  async function EditAnnouncement() {
    const result = await fetch("../../../api/announcements/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, aid, body }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      refreshData();
      toast({
        title: `Announcement edited!`,
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
          <MenuItem onClick={RemoveAnnouncement} icon={<DeleteIcon />}>
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
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea onChange={(e) => setBody(e.target.value)} value={body} />
          </ModalBody>

          <ModalFooter>
            <Flex>
              <Button variant="ghost" onClick={onClose} mr={3}>
                Cancel
              </Button>

              <Spacer />
              <Button colorScheme="blue" onClick={EditAnnouncement}>
                Edit Announcement
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
