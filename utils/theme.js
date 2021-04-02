import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Chivo",
    body: "Overpass",
  },
  styles: {
    global: {
      body: {
        bg: "#023047"
      },
    },
  },
  colors: {
    brand: {
      lightblue: "#AAD7EC",
      bluegreen: "#46C0DE",
      honeyyellow: "#ffb703",
      orange: "#fb8500"
    },
  },
});

export default theme;
