import {
  Box,
  Heading,
  Text,
  Input,
  Center,
  Button,
  Alert,
  AlertIcon,
  Flex,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";

export default function LoginForm({ csrfToken, error }) {
  return (
    <Center mt={12}>
      <Flex
        borderRadius="lg"
        boxShadow="lg"
        bg="blue.50"
        w={{ base: "300px", sm: "400px" }}
        p={4}
        color="blue.900"
        mb="4"
        direction="column"
        align="center"
      >
        <Heading size="2xl" fontSize="45px" mb={4}>
          Sign Up
        </Heading>
        <Text align="center">Welcome to a community of learners like you.</Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            You already have an account.
          </Alert>
        )}
        <form method="post" action="/api/register">
          <Input mt={4} placeholder="Email Address" name="Email" type="text" />
          <Input
            mt={4}
            placeholder="First Name"
            name="First_name"
            type="text"
          />
          <Input mt={4} placeholder="Last Name" name="Last_name" type="text" />

          <Input
            my={4}
            placeholder="Password"
            name="Password"
            type="password"
          />
          <Center>
            <Button bg="blue.800" color="blue.100" type="submit">
              Sign Up
            </Button>
          </Center>
        </form>

        <Center mt={5}>
          <Text fontSize={14}>
            Already have a Brighterspace account?{" "}
            <Link href="/account/sign-up">
              <a>Sign In</a>
            </Link>
            .
          </Text>
        </Center>
      </Flex>
    </Center>
  );
}
