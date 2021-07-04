import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Noto Sans",
    // body: "Open Sans"
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "Noto Sans",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.500",
        height: "100%",
        overflow: "auto",
      },
      html: {
        overflow: "hidden",
        height: "100%",
      },
      a: {
        textDecor: "none",
      },
    },
  },
  initialColorMode: "light",
  useSystemColorMode: true,
});

export default theme;
