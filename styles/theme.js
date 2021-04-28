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
        fontFamily: "Noto Sans"
      }
    }
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
