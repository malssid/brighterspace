import React, { useState } from 'react'
import * as UI from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons"

import { useRouter } from 'next/router'

function NewGradeItem({cid}) {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = UI.useDisclosure()
    const toast = UI.useToast()

    const [name, setName] = useState("")
    const [maxS, setMaxS] = useState()

    const [loading, setLoading] = useState(false)

    function createNewItem(){

      setLoading(true);

      fetch("/api/grades/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cid,
          name,
          max_score: maxS
        })
      }).then(() => {
        // @TODO: display error on permissions issue
        toast({
          title: "Created",
          description: "Grade item has been created",
          status: "success",
        })
        onClose()
        
        // @TODO Use SWR to reload the info on the page instead of a full refresh?
        router.reload()


      }).catch(() => {
        toast({
          title: "Error",
          description: "Could not create grade item",
          status: "error",
        })
      }).finally(() => {
        setLoading(false);
      })
    }

    return (
        <UI.Box>

<UI.Button
        m={5}
        onClick={onOpen}
        leftIcon={<AddIcon />}
        >Add Grade Item</UI.Button>

<UI.Modal isOpen={isOpen} onClose={onClose}>
  <UI.ModalOverlay />
  <UI.ModalContent>
    <UI.ModalHeader>Add a Gradebook Item</UI.ModalHeader>
    <UI.ModalCloseButton />
    <UI.ModalBody>
        <UI.Text mb="8px">Gradebook Item Name</UI.Text>
        <UI.InputGroup mb="8px">
            <UI.Input value={name} onChange={e => setName(e.target.value)} placeholder="Name"></UI.Input>
        </UI.InputGroup>

        <UI.Text mb="8px">Maximum Score</UI.Text>
        <UI.InputGroup>
            <UI.NumberInput value={maxS} >
            <UI.NumberInputField onChange={e => setMaxS(e.target.value)} placeholder="Max Score" />
            <UI.NumberInputStepper>
                <UI.NumberIncrementStepper />
                <UI.NumberDecrementStepper />
            </UI.NumberInputStepper>
            </UI.NumberInput>
        </UI.InputGroup>      
    </UI.ModalBody>
    <UI.ModalFooter>
      <UI.Button colorScheme="blue" mr={3} onClick={createNewItem} isLoading={loading}>
        Add Item
      </UI.Button>
      {/* <Button variant="ghost">Secondary Action</Button> */}
    </UI.ModalFooter>
  </UI.ModalContent>
</UI.Modal>

      
        </UI.Box>
    )
}

export default NewGradeItem
