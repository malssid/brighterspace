import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function DeleteAssignment({ cid, assnid }) {
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
      window.location.reload();
    } else {
      // Display some type of error
    }
  }

  return (
    <Menu placement="bottom">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<EditIcon />}
        variant="outline"
        mb={3}
        size="sm"
      />
      <MenuList>
        <MenuItem onClick={RemoveAssignment} icon={<DeleteIcon />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
