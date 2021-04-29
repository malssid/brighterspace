import React from 'react'
import { 
    Box,  
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure } from '@chakra-ui/react'

import {version} from "../package.json"

export default function About(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box 
                onClick={onOpen} 
                cursor="pointer"
                display={{ base: "none", md: "block" }}
                maxW="300px"
                position="fixed"
                bottom={5}
                left={5}
                fontSize="9pt"
                color="whiteAlpha.400"
                zIndex="0"
                >

                &copy; Brighterspace 2021 <br />
                URI CSC 372 Spring 2021 <br />
                {process.env.NODE_ENV} {version} {" "}
                (Built {" "} {process.env.builddate})

            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Brighterspace {version} </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Brighterspace, a better <b>Learning</b> Management System <br />
                    
                    {process.env.NODE_ENV} {version}  {" "} (Built {process.env.builddate})<br />

                    &copy; Brighterspace 2021 <br /><br />
                    <b>Contributors:</b> @malssid, @bendahrooge <br /><br />

                    Special thanks to Victoria Chavez &amp; Daniel Gauither.  
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
