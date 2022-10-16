//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Client Fetcher - Frontend Client
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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

const sampleEvent = {
  id: '',
  title: '',
  description: '',
  location: '',
  date: '2021-05-12',
  image: 'images/coding-event.jpg',
  isFeatured: false,
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
export async function postRegistrationData(registrationData) {
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
        console.log('[API]', message);
        resolve(result.item);
      })
      .catch((error) => {
        console.error('[API] POST Error:', error);
        reject(error);
      });
  });
}

export async function deleteRegistrationData(registrationData) {
  // <<TODO>
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : NONE Frontend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : ASYNC Frontend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getUserComments(eventId) {
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
        console.log('[API]', message);
        resolve(result.items);
      })
      .catch((error) => {
        console.error('[API] GET Error:', error);
        reject(error);
      });
  });
}

export async function postUserComment(eventId, userComment) {
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
        console.log('[API]', message);
        resolve(result.item);
      })
      .catch((error) => {
        console.error('[API] POST Error:', error);
        reject(error);
      });
  });
}

export async function deleteUserComment(eventId, userComment) {
  // <<TODO>>
}
