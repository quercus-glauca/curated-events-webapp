//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FIREBASE Data Provider - Frontend/Backend Service
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const firebaseURL = process.env.FIREBASE_URL;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find all the 'events' in the Database
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getAllEvents() {
  let response = await fetch(firebaseURL);
  console.debug('[SVR] GET Response Status:', response.status, response.statusText);
  if (response.status !== 200) {
    return [];
  }

  let data = await response.json();
  const allEvents = [];
  Object.entries(data).forEach(([key, entry]) => {
    const event = {
      key,
      ...entry
    };
    allEvents.push(event);
  });

  console.debug('[SVR]:', allEvents.length, 'Entries Fetched');
  return allEvents;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find the featured 'events' in the Database
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  const filteredEvents = _getFeaturedEvents(allEvents);
  return filteredEvents;
}

function _getFeaturedEvents(events) {
  const filteredEvents = events.filter((event) => event.isFeatured);
  console.debug('[SVR] Helper:', filteredEvents.length, '"Featured" Events');

  return filteredEvents;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find the filtered 'events' in the Database
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();
  const filteredEvents = _getFilteredEvents(allEvents, dateFilter);
  return filteredEvents;
}

function _getFilteredEvents(events, dateFilter) {
  const { year, month } = dateFilter;

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
  console.debug('[SVR] Helper:', filteredEvents.length, '"Filtered" Events');

  return filteredEvents;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find a single 'event' in the Database
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getEventById(id) {
  const allEvents = await getAllEvents();
  const singleEvent = _getEventById(allEvents, id);
  return singleEvent;
}

function _getEventById(events, id) {
  const event = events.find((event) => event.id === id);
  if (!event) {
    console.debug('[SVR] Helper: Event', id, 'Not Found!');
  }
  else {
    console.debug('[SVR] Helper: Event', id, 'Found');
  }
  return event;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Post a new 'event' in the configured Database
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function postSingleEvent({ id, title, description, location, date, image, isFeatured }) {
  const entry = { id, title, description, location, date, image, isFeatured };
  let response = await fetch(firebaseURL, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.debug('[SVR] POST Response Status:', response.status, response.statusText);
  if (response.status !== 200) {
    return false;
  }

  let data = await response.json();
  console.debug('[SVR] POST Response Data:', data);
  return true;
}
