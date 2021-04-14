import "@fontsource/chivo/700.css";
import "@fontsource/Overpass/400.css";

import { Image, ChakraProvider } from "@chakra-ui/react";
import { Provider } from 'next-auth/client'
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session} >
      <ChakraProvider theme={theme}>
        <Image src="/brighterspacelogo.svg" alt="logo" w="25rem" p="6" />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
