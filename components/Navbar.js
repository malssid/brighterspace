import React from "react";
import NextLink from "next/link"
import { useSession, signOut } from "next-auth/client";
import { Box, Image, Link, Button } from "@chakra-ui/react";

const Navbar = () => {
  const [session, loading] = useSession();

  return (
    <div>
      <Box
        backgroundColor="blue.500"
        width="100%"
        height="100px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src="/brighterspacelogo.svg" alt="logo" w="25rem" p="6" />
        <Box display="block" mr="50px">
          <NextLink href="/" as='/' passHref>
            <Link mr="50px" fontSize="xl" color="blue.900">
              Courses
            </Link>
          </NextLink>

          {session && (
            <Button
              variant="solid"
              size="md"
              color="blue.900"
              onClick={signOut}
            >
              Sign Out
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
