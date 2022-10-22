import { useRef, useState } from 'react';
import { postRegistrationData } from '../../data/api-client-fetcher';
import classes from './NewsletterRegistration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState();

  function registrationHandler(event) {
    event.preventDefault();

    // Optional at Frontend: Validate Input
    const enteredEmail = emailInputRef.current.value;
    const registrationData = {
      email: enteredEmail,
    };

    postRegistrationData(registrationData)
      .then((result) => {
        if (result.ok) {
          // <<TODO>> Show/Notify SUCCESS to User
          setRegistrationMessage(result.essence.welcome);
          setIsRegistered(true);
        }
        else {
          // <<TODO>> Show/Notify ERROR to User
          console.error(`[ERROR] Status: ${result.status}. Message:`, result.essence);
          setRegistrationMessage(result.essence);
          setIsRegistered(true);
        }
      })
      .catch((error) => {
        // <<TODO>> Show/Notify ERROR to User
        const status = error.code || error.errno || error.syscall || 418;
        console.error(`[ERROR] Status: ${status}. Message:`, error.message);
      });
  }

  const caption = (isRegistered
    ? registrationMessage
    : 'Sign up to stay updated!');

  return (
    <section className={classes.newsletter}>
      <h2>{caption}</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
