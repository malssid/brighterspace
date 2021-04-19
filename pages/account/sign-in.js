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

  return <LoginForm error={router.query.error} csrfToken={props.csrfToken} />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
