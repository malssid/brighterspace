import "@fontsource/chivo/700.css";
import "@fontsource/Overpass/400.css";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar"
import { Provider } from "next-auth/client";
import theme from "../styles/theme";
import Head from "next/head"

import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState(undefined);

  return (
    <>
      <Head>
        <title>{pageTitle || "Brighterspace"}</title>
      </Head>
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
