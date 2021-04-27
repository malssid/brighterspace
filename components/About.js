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

export default function About(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box onClick={onOpen} cursor="pointer">{props.children}</Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Brighterspace {process.env.appversion} </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Brighterspace, a better <b>Learning</b> Management System <br />
                    
                    {process.env.NODE_ENV} {process.env.appversion} (Built {process.env.builddate})<br />

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
