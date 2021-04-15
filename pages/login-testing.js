import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { getSession, useSession, signIn, signOut } from 'next-auth/client'

export default function Home(props) {

  const [ session, loading ] = useSession()

  if(session){
    return <p>
      
      Welcome! {session.user.name} 
      
      <button onClick={() => signOut()}>Sign out</button>
      
      </p>
  }

  return (
    <Flex direction="column" align="center">
      <Heading size="4xl" mb="5" color="blue.50">
        Sign in Required
      </Heading>
      <Text w="80%" mb="5" color="blue.200">
        <button onClick={() => signIn()}>Sign in</button>
      </Text>
    </Flex>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}