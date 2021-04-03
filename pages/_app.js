import "@fontsource/chivo/700.css";
import "@fontsource/Overpass/400.css";

import { Image, ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Image src="brighterspacelogo.svg" alt="logo" w="25rem" p="6" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
