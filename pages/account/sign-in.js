import LoginForm from "../../components/LoginForm"
import { getCsrfToken } from 'next-auth/client'
import { useRouter } from 'next/router'


export default function LoginPage(props) {
    const router = useRouter()

    return (
        <LoginForm 
            error={router.query.error}
            csrfToken={props.csrfToken} 
        />
    )

}

export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context)
      }
    }
  }