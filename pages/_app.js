import { Box, Image, ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box bg="#002147" w="100%" p={4}>
        <Image src="brighterspace.svg" alt="logo" />
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
