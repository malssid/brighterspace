import React from "react";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/client";
import { Box, Image, Link, Button, Flex, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  const [session, loading] = useSession();

  return (
    <div>
      <Flex align="center">
        <Box p="2">
          <Image src="/brighterspacelogo.svg" alt="logo" w="22rem" p="3" />
        </Box>
        <Spacer />
        <Box mr={10}>
          <NextLink href="/" as="/" passHref>
            <Button
              mr="40px"
              color="blue.50"
              size="lg"
              colorScheme="whiteAlpha"
              variant="ghost"
              fontSize="30px"
            >
              Courses
            </Button>
          </NextLink>
          {session && (
            <Button fontSize="30px" color="blue.50" size="lg" variant="ghost" colorScheme="whiteAlpha" onClick={signOut}>
              Sign Out
            </Button>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default Navbar;
