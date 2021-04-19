
import { query } from '../../../../../lib/db'
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from 'react'

import { Heading, Text,   useDisclosure, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Textarea,
    Spacer,
    Alert,  
    AlertIcon } from "@chakra-ui/react";

export default function Assignment({assignment}){
    const router = useRouter();
    const [session, loading] = useSession();
  
    useEffect(() => {
      if (!session && !loading) {
        router.push("/account/sign-in");
      }
    }, []);

    return (
        <>
            <Heading>{assignment.title}</Heading>
            <Text>{assignment.body}</Text>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      return { props: {} };
    }
  
  
    const assignment = await query(
      "SELECT * FROM assignments WHERE cid = ? AND assnid = ?"
    , [context.query.cid, context.query.assignmentid])

    console.log(assignment)
  
    return {
      props: {
        assignment: assignment[0]
      },
    };
  }
  