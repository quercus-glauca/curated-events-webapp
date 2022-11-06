//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SERVER Data Provider - Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  getAllEvents as dummy_getAllEvents,
  getFeaturedEvents as dummy_getFeaturedEvents,
  getFilteredEvents as dummy_getFilteredEvents,
  getEventById as dummy_getEventById,
  getSignupData as dummy_getSignupData,
  postSignupData as dummy_postSignupData,
  deleteSignupData as dummy_deleteSignupData,
  getUserComments as dummy_getUserComments,
  postUserComment as dummy_postUserComment,
  deleteUserComment as dummy_deleteUserComment,
} from './dummy';

import {
  getAllEvents as fs_getAllEvents,
  getFeaturedEvents as fs_getFeaturedEvents,
  getFilteredEvents as fs_getFilteredEvents,
  getEventById as fs_getEventById,
  getUserComments as fs_getUserComments,
  postUserComment as fs_postUserComment,
  deleteUserComment as fs_deleteUserComment,
} from './filesystem';

import {
  getAllEvents as firebase_getAllEvents,
  getFeaturedEvents as firebase_getFeaturedEvents,
  getFilteredEvents as firebase_getFilteredEvents,
  getEventById as firebase_getEventById,
} from './firebase';

import {
  getSignupData as mongodb_getSignupData,
  postSignupData as mongodb_postSignupData,
  deleteSignupData as mongodb_deleteSignupData,
  getUserComments as mongodb_getUserComments,
  postUserComment as mongodb_postUserComment,
  deleteUserComment as mongodb_deleteUserComment,
} from './mongodb';


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § RegistrationData
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const sampleRegistrationData = {
  date: new Date().toISOString(),
  email: '',
  name: '',
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § SignupData
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const sampleSignupData = {
  _id: '',
  date: new Date().toISOString(),
  email: '',
  name: '',
  password: '',
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § Events
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const simpleEvent = {
  id: 'e1',
  title: 'Programming for everyone',
  description:
    'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
  location: 'Somestreet 25, 12345 San Somewhereo',
  date: '2021-05-12',
  image: 'coding-event.jpg',
  isFeatured: false,
};

const eventPost = {
  eventData: { ...simpleEvent },
  eventContent: "MD Formatted Content"
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § UserComments
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const sampleUserComment = {
  _id: '',
  eventId: '',
  date: new Date().toISOString(),
  email: '',
  name: '',
  text: '',
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § RegistrationData : <<TODO>> Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § SignupData : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getSignupDataSync(userId) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_getSignupData(userId);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function postSignupDataSync(userId, signupData) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_postSignupData(userId, signupData);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function deleteSignupDataSync(userId, signupData) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_deleteSignupData(userId, signupData);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § SignupData : ASYNC Backend Implementation
// Return an explicit Promise to let the Client to Synch to the Result
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getSignupData(userId) {
  if (process.env.USERS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_getSignupData(userId)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export async function postSignupData(userId, signupData) {
  if (process.env.USERS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_postSignupData(userId, signupData)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export async function deleteSignupData(userId, signupData) {
  if (process.env.USERS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_deleteSignupData(userId, signupData)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getAllEventsSync() {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getAllEvents();
  }
  else if (process.env.EVENTS_PROVIDER === "fs") {
    return fs_getAllEvents();
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function getFeaturedEventsSync() {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getFeaturedEvents();
  }
  else if (process.env.EVENTS_PROVIDER === "fs") {
    return fs_getFeaturedEvents();
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function getFilteredEventsSync(dateFilter) {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getFilteredEvents(dateFilter);
  }
  else if (process.env.EVENTS_PROVIDER === "fs") {
    return fs_getFilteredEvents(dateFilter);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function getEventByIdSync(id) {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getEventById(id);
  }
  else if (process.env.EVENTS_PROVIDER === "fs") {
    return fs_getEventById(id);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : ASYNC Backend Implementation
// Return an explicit Promise to let the Client to Synch to the Result
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getAllEvents() {
  if (process.env.EVENTS_PROVIDER === "firebase") {
    return new Promise((resolve, reject) => {
      firebase_getAllEvents()
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export async function getFeaturedEvents() {
  if (process.env.EVENTS_PROVIDER === "firebase") {
    return new Promise((resolve, reject) => {
      firebase_getFeaturedEvents()
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export async function getFilteredEvents(dateFilter) {
  if (process.env.EVENTS_PROVIDER === "firebase") {
    return new Promise((resolve, reject) => {
      firebase_getFilteredEvents(dateFilter)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export async function getEventById(id) {
  if (process.env.EVENTS_PROVIDER === "firebase") {
    return new Promise((resolve, reject) => {
      firebase_getEventById(id)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getUserCommentsSync(eventId) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_getUserComments(eventId);
  }
  else if (process.env.COMMENTS_PROVIDER === "fs") {
    return fs_getUserComments(eventId);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function postUserCommentSync(eventId, userComment) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_postUserComment(eventId, userComment);
  }
  else if (process.env.COMMENTS_PROVIDER === "fs") {
    return fs_postUserComment(eventId, userComment);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function deleteUserCommentSync(eventId, userComment) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_deleteUserComment(eventId, userComment);
  }
  else if (process.env.COMMENTS_PROVIDER === "fs") {
    return fs_deleteUserComment(eventId, userComment);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : ASYNC Backend Implementation
// Return an explicit Promise to let the Client to Synch to the Result
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getUserComments(eventId) {
  if (process.env.COMMENTS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_getUserComments(eventId)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export async function postUserComment(eventId, userComment) {
  if (process.env.COMMENTS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_postUserComment(eventId, userComment)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export async function deleteUserComment(eventId, userComment) {
  if (process.env.COMMENTS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_deleteUserComment(eventId, userComment)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}
