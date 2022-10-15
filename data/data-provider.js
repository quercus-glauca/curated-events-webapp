//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// CLIENT DATA PROVIDER < process.env...
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  getAllEvents as dummy_getAllEvents,
  getFeaturedEvents as dummy_getFeaturedEvents,
  getFilteredEvents as dummy_getFilteredEvents,
  getEventById as dummy_getEventById
} from './dummy-data-provider';

import {
  getAllEvents as firebase_getAllEvents,
  getFeaturedEvents as firebase_getFeaturedEvents,
  getFilteredEvents as firebase_getFilteredEvents,
  getEventById as firebase_getEventById
} from './firebase-data-provider';


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SYNC Version
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getAllEventsSync() {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getAllEvents();
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function getFeaturedEventsSync() {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getFeaturedEvents();
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function getFilteredEventsSync(dateFilter) {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getFilteredEvents(dateFilter);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}

export function getEventByIdSync(id) {
  if (process.env.EVENTS_PROVIDER === "dummy") {
    return dummy_getEventById(id);
  }
  console.assert(false, 'Configuration Failure!');
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ASYNC Version
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