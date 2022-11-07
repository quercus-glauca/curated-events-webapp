//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SERVER Data Provider - Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  getAllEvents as dummy_getAllEvents,
  getFeaturedEvents as dummy_getFeaturedEvents,
  getFilteredEvents as dummy_getFilteredEvents,
  getEventById as dummy_getEventById,
  getUserProfile as dummy_getUserProfile,
  postSignupData as dummy_postSignupData,
  deleteUserProfile as dummy_deleteUserProfile,
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
  getUserProfile as mongodb_getUserProfile,
  postSignupData as mongodb_postSignupData,
  deleteUserProfile as mongodb_deleteUserProfile,
  getUserComments as mongodb_getUserComments,
  postUserComment as mongodb_postUserComment,
  deleteUserComment as mongodb_deleteUserComment,
} from './mongodb';

export {
  getAllEvents,
  getAllEventsSync,
  getFeaturedEvents,
  getFeaturedEventsSync,
  getFilteredEvents,
  getFilteredEventsSync,
  getEventById,
  getEventByIdSync,
  getUserProfile,
  getUserProfileSync,
  postSignupData,
  postSignupDataSync,
  deleteUserProfile,
  deleteUserProfileSync,
  getUserComments,
  getUserCommentsSync,
  postUserComment,
  postUserCommentSync,
  deleteUserComment,
  deleteUserCommentSync,
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § Events
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __simpleEvent = {
  id: 'e1',
  title: 'Programming for everyone',
  description:
    'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
  location: 'Somestreet 25, 12345 San Somewhereo',
  date: '2021-05-12',
  image: 'coding-event.jpg',
  isFeatured: false,
};

const __eventPost = {
  eventData: { ...__simpleEvent },
  eventContent: "MD Formatted Content"
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § RegistrationData
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __registrationData = {
  date: new Date().toISOString(),
  email: '',
  name: '',
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § SignupData
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __signupData = {
  email: '',
  name: '',
  password: '',    // plain-text
};

const __userProfile = {
  _id: '',
  date: new Date().toISOString(),
  email: '',
  name: '',
  password: '',    // hashed
};

const __simpleUserProfile = {
  email: '',
  name: '',
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SAMPLE DATA § UserComments
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __userComment = {
  _id: '',
  eventId: '',
  date: new Date().toISOString(),
  email: '',
  name: '',
  text: '',
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getAllEventsSync() {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getAllEvents();
  }
  else if (process.env.EVENTS_PROVIDER === "fs") {
    return fs_getAllEvents();
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

function getFeaturedEventsSync() {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getFeaturedEvents();
  }
  else if (process.env.EVENTS_PROVIDER === "fs") {
    return fs_getFeaturedEvents();
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

function getFilteredEventsSync(dateFilter) {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getFilteredEvents(dateFilter);
  }
  else if (process.env.EVENTS_PROVIDER === "fs") {
    return fs_getFilteredEvents(dateFilter);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

function getEventByIdSync(id) {
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
async function getAllEvents() {
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

async function getFeaturedEvents() {
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

async function getFilteredEvents(dateFilter) {
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

async function getEventById(id) {
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
// § RegistrationData : <<TODO>> Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § SignupData : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getUserProfileSync(userEmail) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_getUserProfile(userEmail);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

function postSignupDataSync(signupData) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_postSignupData(signupData);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

function deleteUserProfileSync(userEmail) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_deleteUserProfile(userEmail);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § SignupData : ASYNC Backend Implementation
// Return an explicit Promise to let the Client to Synch to the Result
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getUserProfile(userEmail) {
  if (process.env.USERS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_getUserProfile(userEmail)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

async function postSignupData(signupData) {
  if (process.env.USERS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_postSignupData(signupData)
        .then((result) => { resolve(result); })
        .catch((error) => { reject(error); });
    });
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

async function deleteUserProfile(userEmail) {
  if (process.env.USERS_PROVIDER === "mongodb") {
    return new Promise((resolve, reject) => {
      mongodb_deleteUserProfile(userEmail)
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
function getUserCommentsSync(eventId) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_getUserComments(eventId);
  }
  else if (process.env.COMMENTS_PROVIDER === "fs") {
    return fs_getUserComments(eventId);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

function postUserCommentSync(eventId, userComment) {
  if (process.env.COMMENTS_PROVIDER === "dummy") {
    return dummy_postUserComment(eventId, userComment);
  }
  else if (process.env.COMMENTS_PROVIDER === "fs") {
    return fs_postUserComment(eventId, userComment);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

function deleteUserCommentSync(eventId, userComment) {
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
async function getUserComments(eventId) {
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

async function postUserComment(eventId, userComment) {
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

async function deleteUserComment(eventId, userComment) {
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
