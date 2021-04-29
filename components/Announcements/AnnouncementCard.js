import { Flex, Badge, Text, Spacer } from "@chakra-ui/react";
import DeleteAnnouncement from "./DeleteAnnouncement";

import { useState } from "react";

/**
 * Displays an annocument card with title, poster, body and date posted
 * @param {object} param0 Annocument data
 * @returns
 */
export default function AnnouncementCard({ isInstructor, announcement }) {
  return (
    <Flex
      borderRadius="lg"
      boxShadow="lg"
      bg="blue.50"
      p={4}
      w={{base: "90%", md:"80%", xl: "70%"}}
      color="blue.900"
      mb="4"
      direction="column"
      align="center"
    >
      {isInstructor && (
        <DeleteAnnouncement cid={announcement.cid} aid={announcement.aid} />
      )}
      <Text fontWeight="600" fontSize="20px">
        {announcement.body}
      </Text>
      <Badge mt={2} borderRadius="full" py={1} px={2} bg="blue.200">
        {announcement.dateposted}
      </Badge>
    </Flex>
  );
}
