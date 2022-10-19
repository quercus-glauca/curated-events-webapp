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
      .then((item) => {
        console.log('Registration Result:', item);
        if (typeof item === "string") {
          // Failed
          // <<TODO>> UI Feedback
          setRegistrationMessage(item);
          setIsRegistered(true);
        }
        else {
          // Succeeded
          // <<TODO>> UI Feedback
          setRegistrationMessage(item.welcome);
          setIsRegistered(true);
        }
      })
      .catch((error) => {
        console.log('Registration Error:', error);
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
