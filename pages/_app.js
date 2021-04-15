import "@fontsource/chivo/700.css";
import "@fontsource/Overpass/400.css";

import { Image, Box, ChakraProvider } from "@chakra-ui/react";
import { Provider } from 'next-auth/client'
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session} >
      <ChakraProvider theme={theme}>
        <Box w="100vw">
          <Image src="/brighterspacelogo.svg" alt="logo" w="25rem" p="6" />
        </Box>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
