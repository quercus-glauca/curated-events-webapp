import { useContext, useRef } from 'react';
import { NotificationContext } from '../../context/NotificationProvider';
import { postRegistrationData } from '../../data/api-client-fetcher';
import classes from './NewsletterRegistration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const { showNotification } = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // Optional at Frontend: Validate Input
    const enteredEmail = emailInputRef.current.value;
    const registrationData = {
      email: enteredEmail,
    };

    showNotification('pending', "Registration", "Registration in progress...");

    postRegistrationData(registrationData)
      .then((result) => {
        if (result.ok) {
          showNotification('success', "Registration", result.essence.welcome);
        }
        else {
          showNotification('error', "Registration", `${result.essence}`);
        }
      })
      .catch((error) => {
        const status = error.code || error.errno || error.syscall || 418;
        showNotification('error', "Registration", `Error (${status}): ${error.message}`);
      });
  }

  const caption = 'Sign up to stay updated!';

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
