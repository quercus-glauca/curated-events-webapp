import ProfileForm from "components/input/ProfileForm";
import { Fragment } from "react";

export default function ProfilePage(props) {
  return (
    <Fragment>
      <ProfileForm
        userEmail={'dummy@dummy'}
        userName={'Dummy'}
      />
    </Fragment>
  );
}
