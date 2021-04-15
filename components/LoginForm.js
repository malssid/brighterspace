import { Box, Heading, Text, Input, Center, Button, Alert, AlertIcon } from "@chakra-ui/react";

export default function LoginForm({ csrfToken, error }) {
  return (
    <Center>
      <Box
        borderRadius="lg"
        boxShadow="lg"
        bg="blue.50"
        w="50%"
        p={4}
        color="blue.900"
        mb="4"
      >
        <Heading>Login</Heading>
        <Text>Login with your email and Brighterspace password.</Text>
        {error && <Alert status="error"><AlertIcon />Your username and/or password was incorrect.</Alert>}
        <form method='post' action='/api/auth/callback/credentials'>
        <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
          <label>
            Username
            <Input name='username' type='text'/>
          </label>
          <label>
            Password
            <Input name='password' type='password'/>
          </label>
          <Button type='submit'>Sign in</Button>
      </form>
      </Box>
    </Center>
  );
}
