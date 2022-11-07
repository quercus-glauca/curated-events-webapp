import { Fragment } from "react";
import { getToken } from "next-auth/jwt";
import ProfileForm from "components/input/ProfileForm";

export default function ProfilePage(props) {
  const { token } = props;
  console.log('[NextAuth] token:', token)
  return (
    <Fragment>
      <ProfileForm
        userEmail={token.email}
        userName={token.name}
      />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req });
  if (!token) {
    return ({
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    });
  }
  return ({
    props: {
      token
    }
  });
}
