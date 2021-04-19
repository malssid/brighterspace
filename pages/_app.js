import "@fontsource/chivo/700.css";
import "@fontsource/Overpass/400.css";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Provider } from "next-auth/client";
import theme from "../styles/theme";
import NextHead from "next/head";
import { GoogleFonts } from "next-google-fonts";

import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState(undefined);

  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle || "Brighterspace"}</title>
      </NextHead>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Navbar pageTitle={pageTitle} />
          <Component {...setPageTitle} {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
