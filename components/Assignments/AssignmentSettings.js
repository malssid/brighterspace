import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
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
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SettingsIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AssignmentSettings({
  cid,
  assnid,
  prevTitle,
  prevBody,
  prevSubmissiontype,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submissiontype, setSubmissionType] = useState("");

  useEffect(() => {
    setTitle(prevTitle);
    setBody(prevBody);
    setSubmissionType(prevSubmissiontype);
  }, [isOpen]);

  const refreshData = () => router.replace(router.asPath);

  async function RemoveAssignment() {
    const result = await fetch("../../../api/assignments/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, assnid }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      refreshData();
      toast({
        title: `Assignment deleted!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    } else {
      // Display some type of error
    }
  }

  async function EditAssignment() {
    const result = await fetch("../../../api/assignments/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid, assnid, title, body, submissiontype }),
    });

    if (result.status === 200) {
      setTimeout(() => {
        onClose();
      }, 1000);
      refreshData();
      toast({
        title: `Assignment edited!`,
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
          <MenuItem onClick={RemoveAssignment} icon={<DeleteIcon />}>
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
          <ModalHeader>Edit Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Textarea onChange={(e) => setBody(e.target.value)} value={body} />
            <Select
              value={submissiontype}
              onChange={(e) => setSubmissionType(e.target.value)}
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
              <Button colorScheme="blue" onClick={EditAssignment}>
                Edit Assignment
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
