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
        bg: "linear-gradient(14deg, rgba(12,29,52,1) 15%, rgba(32,42,139,1) 75%)",
        height: "100%",
        overflow: "auto"
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
