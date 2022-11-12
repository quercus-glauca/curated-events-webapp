import { useContext, useRef } from 'react';
import { NotificationContext } from 'context/NotificationProvider';
import { patchUserProfile } from 'lib/api/client-fetcher';
import classes from './ProfileForm.module.css';

export default function ProfileForm(props) {
  const { userEmail, userName } = props;
  const caption = 'Change Profile';

  const passwordInputRef = useRef();
  const newPasswordInputRef = useRef();

  const { showNotification } = useContext(NotificationContext);

  function updateUserProfileHandler(event) {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    // Optional at Frontend: Validate Input
    if (
      !enteredPassword ||
      enteredPassword.trim() === '' ||
      !enteredNewPassword ||
      enteredNewPassword.trim() === ''
    ) {
      showNotification('error', caption, 'Please enter a valid password!');
      return;
    }

    const changeUserProfile = {
      email: userEmail,
      name: userName,
      password: enteredPassword,
      change: {
        password: enteredNewPassword,
      }
    };
    showNotification('pending', caption, "Updating in progress...");
    patchUserProfile(changeUserProfile)
      .then((result) => {
        if (result.ok) {
          showNotification('success', caption, result.greeting);
        }
        else {
          showNotification('error', caption, `${result.essence}`);
        }
      })
      .catch((error) => {
        const status = error.code || error.errno || error.syscall || 418;
        showNotification('error', caption, `Error (${status}): ${error.message}`);
      });
  }

  return (
    <section className={classes.form}>
      <h1>{'Your Profile'}</h1>
      <div className={classes.fieldGroup}>
        <div className={classes.fieldLabel}>Email</div>
        <div className={classes.fieldValue}>{userEmail}</div>
      </div>
      <div className={classes.fieldGroup}>
        <div className={classes.fieldLabel}>Name</div>
        <div className={classes.fieldValue}>{userName}</div>
      </div>
      <form onSubmit={updateUserProfileHandler}>
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
