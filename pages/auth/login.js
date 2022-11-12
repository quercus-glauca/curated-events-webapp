import { Fragment } from "react";
import { getToken } from "next-auth/jwt";
import AuthForm from "components/input/AuthForm";

export default function LoginPage(props) {
  return (
    <Fragment>
      <AuthForm />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req });
  if (token) {
    return ({
      redirect: {
        destination: '/user/profile',
        permanent: false
      }
    });
  }
  return ({
    props: {}
  });
}
