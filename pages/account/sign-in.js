import { Flex, Box } from "@chakra-ui/react";
import LoginForm from "../../components/LoginForm";
import { getCsrfToken, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage(props) {
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
        <LoginForm error={router.query.error} csrfToken={props.csrfToken} />
      </Box>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
