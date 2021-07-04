import { Flex, Box } from "@chakra-ui/react";
import SignUpForm from "../../components/SignUpForm";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUp(props) {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [loading]);

  return (
    <Flex justify="center" align="center" width="100vw" height="100vh" mt={-5}>
      <Box>
        <SignUpForm error={router.query.error} />
      </Box>
    </Flex>
  );
}
