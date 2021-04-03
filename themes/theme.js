import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Chivo",
    body: "Overpass",
  },
  styles: {
    global: {
      body: {
        bg: "blue.800",
      },
    },
  },
});

export default theme;
