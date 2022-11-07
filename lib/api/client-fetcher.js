//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Client Fetcher - Frontend Client
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export {
  postRegistrationData,
  deleteRegistrationData,
  postSignupData,
  deleteUserProfile,
  getUserComments,
  postUserComment,
  deleteUserComment,
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA
//-----------------------------------------------------------------------------
//  § RegistrationData  : Client --> API --> Server
//  § Events            : Server-side Rendering (SSR)
//  § UserComments      : Client <-> API <-> Server
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const sampleRegistrationData = {
  date: new Date().toISOString(),
  email: '',
  name: '',
};

const sampleSignupData = {
  date: new Date().toISOString(),
  email: '',
  name: '',
  password: '',
};

const sampleUserComment = {
  eventId: '',
  date: new Date().toISOString(),
  email: '',
  name: '',
  text: '',
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § RegistrationData : ASYNC Frontend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function postRegistrationData(registrationData) {
  // Construct the API Entrypoint URL
  const apiEntrypoint = '/api/registration';

  // Use the JavaScript fetch API to GET to our Server from the Client
  // Return an explicit Promise to let the Client to Synch to the Result:
  // - Resolve : the API response
  // - Reject : the same standard JavaScript error Object already catched
  return new Promise((resolve, reject) => {
    fetch(apiEntrypoint, {
      method: 'POST',
      body: JSON.stringify({ registrationData }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => (response.json()))
      .then((data) => {
        const { message, result } = data;
        console.debug('[API]', message);
        resolve(result);
      })
      .catch((error) => {
        console.error('[API] POST Error:', error);
        reject(error);
      });
  });
}

async function deleteRegistrationData(registrationData) {
  // <<TODO>
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § SignupData : ASYNC Frontend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function postSignupData(signupData) {
  // Construct the API Entrypoint URL
  const apiEntrypoint = '/api/auth/signup';

  // Use the JavaScript fetch API to GET to our Server from the Client
  // Return an explicit Promise to let the Client to Synch to the Result:
  // - Resolve : the API response
  // - Reject : the same standard JavaScript error Object already catched
  return new Promise((resolve, reject) => {
    fetch(apiEntrypoint, {
      method: 'POST',
      body: JSON.stringify({ signupData }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => (response.json()))
      .then((data) => {
        const { message, result } = data;
        console.debug('[API]', message);
        resolve(result);
      })
      .catch((error) => {
        console.error('[API] POST Error:', error);
        reject(error);
      });
  });
}

async function deleteUserProfile(userEmail) {
  // <<TODO>
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : NONE Frontend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : ASYNC Frontend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getUserComments(eventId) {
  // Construct the API Entrypoint URL
  const apiEntrypoint = `/api/comments/${eventId}`;

  // Use the JavaScript fetch API to GET to our Server from the Client
  // Return an explicit Promise to let the Client to Synch to the Result:
  // - Resolve : the API response
  // - Reject : the same standard JavaScript error Object already catched
  return new Promise((resolve, reject) => {
    fetch(apiEntrypoint)
      .then((response) => (response.json()))
      .then((data) => {
        const { message, result } = data;
        console.debug('[API]', message);
        resolve(result);
      })
      .catch((error) => {
        console.error('[API] GET Error:', error);
        reject(error);
      });
  });
}

async function postUserComment(eventId, userComment) {
  // Construct the API Entrypoint URL
  const apiEntrypoint = `/api/comments/${eventId}`;

  // Use the JavaScript fetch API to GET to our Server from the Client
  // Return an explicit Promise to let the Client to Synch to the Result:
  // - Resolve : the API response
  // - Reject : the same standard JavaScript error Object already catched
  return new Promise((resolve, reject) => {
    fetch(apiEntrypoint, {
      method: 'POST',
      body: JSON.stringify({ userComment }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => (response.json()))
      .then((data) => {
        const { message, result } = data;
        console.debug('[API]', message);
        resolve(result);
      })
      .catch((error) => {
        console.error('[API] POST Error:', error);
        reject(error);
      });
  });
}

async function deleteUserComment(eventId, userComment) {
  // <<TODO>>
}
