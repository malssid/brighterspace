import React from "react";
import { Box } from "@chakra-ui/react";

function Container(props) {
  return (
    <Box p={5} bgColor="blackAlpha.400" width="100%" minH="100vh">
      {props.children}
    </Box>
  );
}

export default Container;
