//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DUMMY Data Provider - Backend Server
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DUMMY DATA § Events
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const DUMMY_EVENTS = [
  {
    data: {
      id: 'programming-for-everyone',
      title: 'Programming for everyone',
      description:
        'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
      location: 'Somestreet 25, 12345 San Somewhereo',
      date: '2021-05-12',
      image: 'coding-event.jpg',
      isFeatured: false,
    },
    content: ""
  },
  {
    data: {
      id: 'networking-for-introverts',
      title: 'Networking for introverts',
      description:
        "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
      location: 'New Wall Street 5, 98765 New Work',
      date: '2021-05-30',
      image: 'introvert-event.jpg',
      isFeatured: true,
    },
    content: ""
  },
  {
    data: {
      id: 'networking-for-extroverts',
      title: 'Networking for extroverts',
      description:
        'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
      location: 'My Street 12, 10115 Broke City',
      date: '2022-04-10',
      image: 'extrovert-event.jpg',
      isFeatured: true,
    },
    content: ""
  },
];

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.data.isFeatured);
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.data.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.data.id === id);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DUMMY DATA § SignupData
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let DUMMY_USERS = [
  {
    email: 'max@its.me',
    name: 'Maximilian',
  },
  {
    email: 'angela@its.me',
    name: 'Angela',
  },
  {
    email: 'severus@its.me',
    name: 'Severus',
  },
];

export function getSignupData(userId) {
  return DUMMY_USERS[0];
}

export function postSignupData(userId, signupData) {
  return signupData;
}

export function deleteSignupData(userId, signupData) {
  return signupData;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DUMMY DATA § UserComments
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let DUMMY_COMMENTS = [
  {
    email: 'hello@its.me',
    name: 'Maximilian',
    text: 'My comment is amazing!',
  },
  {
    email: 'hithere@its.me',
    name: 'Angela',
    text: 'My comment is awesome!',
  },
  {
    email: 'hithere@its.me',
    name: 'Severus',
    text: 'My comment is thrilling!',
  },
];

export function getUserComments(eventId) {
  return DUMMY_COMMENTS;
}

export function postUserComment(eventId, userComment) {
  DUMMY_COMMENTS.push(userComment);
  return userComment;
}

export function deleteUserComment(eventId, userComment) {
  DUMMY_COMMENTS = DUMMY_COMMENTS.filter((item) => (
    item.email !== userComment.email ||
    item.name !== userComment.name ||
    item.text !== userComment.text
  ));
  return userComment;
}
