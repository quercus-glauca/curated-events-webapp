import { signIn } from 'next-auth/react';
import { useContext, useRef, useState } from 'react';
import { NotificationContext } from 'context/NotificationProvider';
import { postSignupData } from 'lib/api/client-fetcher';
import classes from './AuthForm.module.css';

export default function AuthForm(props) {
  const [isLogin, setIsLogin] = useState(true);
  const caption = isLogin ? 'Login' : 'Sign Up';

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const { showNotification, thenRedirect } = useContext(NotificationContext);

  function toggleAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function sendAuthDataHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Optional at Frontend: Validate Input
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredPassword ||
      enteredPassword.trim() === ''
    ) {
      showNotification('error', caption, 'Please enter a valid email address, name and password!')
      return;
    }

    const signupData = {
      email: enteredEmail,
      name: enteredName,
      password: enteredPassword
    }
    if (isLogin) {
      showNotification('pending', caption, "Login in progress...");
      signIn('credentials', {
        redirect: false,
        ...signupData
      })
        .then((result) => {
          if (!result.error) {
            showNotification('success', caption, `Welcome back, ${signupData.name}!`);
            thenRedirect(true, '/', 'back');
            passwordInputRef.current.value = '';
          }
          else {
            showNotification('error', caption, result.error);
            passwordInputRef.current.value = '';
          }
        });
    }
    else {
      showNotification('pending', caption, "Sign-up in progress...");
      postSignupData(signupData)
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
  }

  return (
    <section className={classes.form}>
      <h1>{caption}</h1>
      <form onSubmit={sendAuthDataHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' required ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <div className={classes.action}>
            <button type='submit' className={classes.button}>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>
          <div className={classes.action}>
            <button type='button' className={classes.toggle} onClick={toggleAuthModeHandler}>
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
