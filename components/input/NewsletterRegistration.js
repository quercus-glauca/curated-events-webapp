import { useRef, useState } from 'react';
import classes from './NewsletterRegistration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState();

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const enteredEmail = emailInputRef.current.value;
    const registrationData = {
      email: enteredEmail,
    };

    fetch('/api/registration', {
      method: 'POST',
      body: JSON.stringify(registrationData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response:', data);
      setRegistrationMessage(data.message);
      setIsRegistered(true);
    })
    .catch((error) => console.log('API Error:', error));

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
