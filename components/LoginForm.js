import {
  Box,
  Heading,
  Text,
  Input,
  Center,
  Button,
  Alert,
  AlertIcon,
  Flex
} from "@chakra-ui/react";

export default function LoginForm({ csrfToken, error }) {
  return (
    <Center mt={12}>
      <Flex
        borderRadius="lg"
        boxShadow="lg"
        bg="blue.50"
        w={{base: "300px", sm: "400px"}}
        p={4}
        color="blue.900"
        mb="4"
        direction="column"
        align="center"
      >
        <Heading size="2xl" fontSize="45px" mb={4}>Login</Heading>
        <Text align="center">Login with your email and Brighterspace password.</Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            Your username and/or password was incorrect.
          </Alert>
        )}
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Input mt={4} placeholder="Username" name="username" type="text" />
            <Input my={4} placeholder="Password" name="password" type="password" />
          <Center><Button bg="blue.800" color="blue.100" type="submit">Sign in</Button></Center>
        </form>
      </Flex>
    </Center>
  );
}
