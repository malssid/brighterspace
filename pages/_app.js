import { Box, Image, ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#c0ddf2",
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#002147" w="100%" p={4}>
        <Image src="brighterspace.svg" alt="logo" w="20rem"/>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
