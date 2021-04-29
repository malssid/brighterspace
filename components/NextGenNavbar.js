import React, { useState } from "react";

import NextLink from "next/link";

import * as UI from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  AttachmentIcon,
  ChatIcon,
} from "@chakra-ui/icons";

import About from "./About";

export function Search(props) {
  return (
    <UI.Box
      // display={{base: props.isOpen ? 'block' : 'none', md: 'block' }}
      mt={6}
    >
      {/* Command platte/global search? */}
      <UI.Text
        // autoCapitalize="true"
        textTransform="uppercase"
        color="gray.500"
        fontSize={13}
        marginBottom={2}
        // m="10px"
      >
        Search
      </UI.Text>

      <UI.InputGroup>
        <UI.InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <UI.Input
          // m="10px"
          borderColor="whiteAlpha.400"
          color="white"
          placeholder="Search your courses"
        ></UI.Input>
      </UI.InputGroup>
    </UI.Box>
  );
}

export function Group(props) {
  return (
    <UI.Box
      // display={{base: props.isOpen ? 'block' : 'none', md: 'block' }}
      mt={6}
    >
      {/* Command platte/global search? */}
      <UI.Text
        textTransform="uppercase"
        color="gray.500"
        fontSize={13}
        marginBottom={2}
      >
        {props.title}
      </UI.Text>

      {props.children}
    </UI.Box>
  );
}

export function Link(props) {
  return (
    <UI.Box mb={2}>
      <NextLink href={props.href || "/"}>
        <a>
          <UI.Button
            w="100%"
            leftIcon={<AttachmentIcon color="gray.500" />}
            variant="ghost"
            color="gray.300"
            justifyContent="flex-start"
            _hover={{
              backgroundColor: props.active ? "gray.600" : "gray.700",
            }}
            fontWeight={props.active ? "600" : 300}
            backgroundColor={props.active ? "gray.600" : undefined}
          >
            {props.text}
          </UI.Button>
        </a>
      </NextLink>
    </UI.Box>
  );
}

export default function NextGenNavbar(props) {
  // Defines whether the navbar menu items are visible or not
  const { isOpen, onToggle } = UI.useDisclosure();

  // whether the about pane is open or not
  const [showCredits, setCreditsVisibility] = useState(false);

  return (
    <UI.Box
      minWidth={{ base: "100vw", md: "300px" }}
      h={{ base: "100%", md: "100vh" }}
      marginRight={{ base: "0", md: "20px" }}
      bgColor="blackAlpha.600"
      borderTopRightRadius={{ base: "0px", md: "35px" }}
      borderBottomRightRadius={{ base: "0px", md: "35px" }}
      p="5"
    >
      <UI.Flex direction="column">
        <UI.Box align="center">
          {/* Application name */}
          <UI.HStack justifyContent="space-between" align="center">
            <NextLink href="/">
              <a>
                <UI.Image
                  src="/brighterspacelogo.svg"
                  alt="Brighterspace"
                  w={{ sm: "60vw", md: "250px" }}
                />
              </a>
            </NextLink>

            <UI.IconButton
              display={{ base: "block", md: "none" }}
              aria-label="Open menu"
              fontSize="30px"
              color="blue.200"
              variant="ghost"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={onToggle}
              colorScheme="whiteAlpha"
            />
          </UI.HStack>

          {/* <UI.Heading>{props.pageTitle}</UI.Heading> */}
        </UI.Box>

        {/* Children passed to the navbar will go here... */}
        <UI.Box display={{ base: isOpen ? "block" : "none", md: "block" }}>
          {props.children}
        </UI.Box>

        <About>
          <UI.Text
            onClick={() => setCreditsVisibility(true)}
            display={{ base: "none", md: "block" }}
            maxW="300px"
            position="fixed"
            bottom={5}
            fontSize="9pt"
            color="whiteAlpha.400"
          >
            &copy; Brighterspace 2021 <br />
            URI CSC 372 Spring 2021 <br />
            {process.env.NODE_ENV} {process.env.appversion} (Built{" "}
            {process.env.builddate})
          </UI.Text>
        </About>
      </UI.Flex>
    </UI.Box>
  );
}
