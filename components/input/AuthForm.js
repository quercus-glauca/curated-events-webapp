import { useRef, useState } from 'react';
import classes from './AuthForm.module.css';

export default function AuthForm(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  function toggleAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function sendAuthDataHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredPassword ||
      enteredPassword.trim() === ''
    ) {
      setIsInvalid(true);
      // <<TODO>> Notify the user
      return;
    }

    // <<TODO>> Post the auth data
  }

  return (
    <section className={classes.form}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
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
