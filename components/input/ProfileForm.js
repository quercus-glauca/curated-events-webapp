import { useRef, useState } from 'react';
import classes from './ProfileForm.module.css';

export default function ProfileForm(props) {
  const { userEmail, userName } = props;

  const [isInvalid, setIsInvalid] = useState(false);

  const passwordInputRef = useRef();
  const newPasswordInputRef = useRef();

  function sendProfileDataHandler(event) {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    if (
      !enteredPassword ||
      enteredPassword.trim() === '' ||
      !enteredNewPassword ||
      enteredNewPassword.trim() === ''
    ) {
      setIsInvalid(true);
      // <<TODO>> Notify the user
      return;
    }

    // <<TODO>> Post the auth data
  }

  return (
    <section className={classes.form}>
      <h1>{'Your User Profile'}</h1>
      <p>Email: <strong>{userEmail}</strong></p>
      <p>Name: <strong>{userName}</strong></p>
      <form onSubmit={sendProfileDataHandler}>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='newPassword'>New password</label>
          <input type='password' id='newPassword' required ref={newPasswordInputRef} />
        </div>
        <div className={classes.actions}>
          <div className={classes.action}>
            <button type='submit' className={classes.button}>
              {'Change Password'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
