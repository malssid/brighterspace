import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function DeleteAnnouncement({ cid, aid }) {
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
        <MenuItem onClick={RemoveAnnouncement} icon={<DeleteIcon />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
