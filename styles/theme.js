import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Chivo",
    body: "Overpass",
    // body: "Open Sans"
  },
  styles: {
    global: {
      body: {
        bg: "blue.900",
        // bgGradient: "linear(to-b, blue.700, blue.900)",
        height: "100%",
        overflow: "hidden"
      },
      html: {
        overflow: "hidden",
        height: "100%"
      },
      a: {
        textDecor: "none"
      }
    },
  },
});

export default theme;
