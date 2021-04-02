import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Chivo",
    body: "Overpass",
  },
  styles: {
    global: {
      body: {
        bg: "#023047",
      },
    },
  },
  colors: {
    blue: {
      50: "#e1f7ff",
      100: "#bde3f3",
      200: "#97cee8",
      300: "#6fbadd",
      400: "#4aa7d3",
      500: "#338dba",
      600: "#256e91",
      700: "#174e68",
      800: "#072f41",
      900: "#00111a",
    },
    yellow: {
      50: "#fff8da",
      100: "#ffe9ad",
      200: "#ffdb7d",
      300: "#ffcc4b",
      400: "#ffbd1a",
      500: "#e6a400",
      600: "#b37f00",
      700: "#805b00",
      800: "#4e3700",
      900: "#1e1100",
    },
  },
});

export default theme;
