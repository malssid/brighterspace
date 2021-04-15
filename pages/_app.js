import "@fontsource/chivo/700.css";
import "@fontsource/Overpass/400.css";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar"
import { Provider } from "next-auth/client";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
