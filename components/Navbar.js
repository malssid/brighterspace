import React from "react";
import { useSession, signOut } from "next-auth/client";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Image,
  Heading
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar({pageTitle}) {
  const [session, loading] = useSession();
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg="blue.900"
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="lg"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <Image src="/brighterspacelogo.svg" alt="logo" w="22rem" p="3" />
          </Flex>
          <Box>
            <Heading color="white" display={{ base: "none", md: "block" }}>{pageTitle}</Heading>
          </Box>
          <HStack display="flex" alignItems="center" spacing={1}>
          {session && (
            <HStack
              spacing={1}
              mr={1}
              color="blue.50"
              display={{ base: "none", md: "inline-flex" }}
            >
              <NextLink href="/">
                <Button
                  variant="ghost"
                  size="lg"
                  color="blue.50"
                  colorScheme="whiteAlpha"
                >
                  Courses
                </Button>
              </NextLink>
              <NextLink href="#">
                <Button
                  variant="ghost"
                  size="lg"
                  color="blue.50"
                  colorScheme="whiteAlpha"
                >
                  Assignments
                </Button>
              </NextLink>
            </HStack>
            )}
            {session && (
              <Button
                variant="ghost"
                color="blue.50"
                colorScheme="whiteAlpha"
                size="lg"
                onClick={signOut}
              >
                Sign Out
              </Button>
            )}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="blue.200"
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
                colorScheme="whiteAlpha"
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg="blue.900"
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  color="blue.200"
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <NextLink href="/">
                  <Button
                    color="blue.50"
                    w="full"
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    onClick={mobileNav.onClose}
                  >
                    Courses
                  </Button>
                </NextLink>
                <NextLink href="#">
                <Button
                  color="blue.50"
                  w="full"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={mobileNav.onClose}
                >
                  Assignments
                </Button>
                </NextLink>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
