import "@fontsource/chivo/700.css";
import "@fontsource/overpass/400.css";

import { ChakraProvider } from "@chakra-ui/react";
import * as UI from "@chakra-ui/react";

import Navbar from "../components/Navbar";

import { Provider } from "next-auth/client";
import theme from "../styles/theme";
import NextHead from "next/head";
import { GoogleFonts } from "next-google-fonts";

import { useState } from "react";
import NextGenNavbar from "../components/NextGenNavbar";

function MyApp({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState(undefined);
  const [navMenu, setNavMenu] = useState(<p>Test</p>);


  return (
    <p>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&display=swap" />
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle || "Brighterspace"}</title>
      </NextHead>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>

          {/* Reactor as an app specific provider? */}
          <UI.Flex
                direction={{base: 'column', md: 'row'}}
                align="flex-start"
          >
            <NextGenNavbar pageTitle={pageTitle}>{navMenu}</NextGenNavbar>
            <Component 
              setPageTitle={setPageTitle}  
              setNavMenu={setNavMenu}
              {...pageProps} />
          </UI.Flex>

          {/* <Navbar pageTitle={pageTitle} /> */}
        </ChakraProvider>
      </Provider>
    </p>
  );
}

export default MyApp;
