import React from "react";
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
          <Link mr="50px" fontSize="xl" color="blue.900">
            Courses
          </Link>
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
