import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Chivo",
    body: "Overpass",
  },
  styles: {
    global: {
      body: {
        bg: "blue.900",
      },
      a: {
        textDecor: "none"
      }
    },
  },
});

export default theme;
