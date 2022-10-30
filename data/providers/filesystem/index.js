//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FILESYSTEM Data Provider - Backend Server
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import fs from 'fs';
import path from 'path';

const userCommentsFilename = path.join(process.cwd(),
  'content', 'comments', 'user-comments.json');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find all the 'events'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getAllEvents() {
  const allEvents = [];

  // <<TODO>>

  console.debug('[SRV]:', allEvents.length, 'Events Found');
  return allEvents;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find the featured 'events'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getFeaturedEvents() {
  const filteredEvents = [];

  // <<TODO>>

  console.debug('[SRV]:', filteredEvents.length, '"Featured" Events');
  return filteredEvents;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find the filtered 'events'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getFilteredEvents(dateFilter) {
  const filteredEvents = [];

  // <<TODO>>

  console.debug('[SRV]:', filteredEvents.length, '"Filtered" Events');
  return filteredEvents;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find a single 'event'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getEventById(id) {
  const event = null;

  // <<TODO>>

  if (!event) {
    console.debug('[SRV]: Event', id, 'Not Found!');
  }
  else {
    console.debug('[SRV]: Event', id, 'Found');
  }
  return event;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Post a new 'event'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function postSingleEvent(eventData, eventContent) {
  // <<TODO>>

  return false;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getUserComments(eventId) {
  const fileData = fs.readFileSync(userCommentsFilename);
  const userComments = JSON.parse(fileData);
  const filteredUserComments = userComments.filter((item) => (
    !('eventId' in item) || item.eventId !== eventId
  ));
  return filteredUserComments;
}

export function postUserComment(eventId, userComment) {
  const fileData = fs.readFileSync(userCommentsFilename);
  const userComments = JSON.parse(fileData);
  const insertedUserComment = {
    eventId: eventId,
    date: new Date().toISOString(),
    email: userComment.email,
    name: userComment.name,
    text: userComment.text,
  };
  userComments.push(insertedUserComment);
  fs.writeFileSync(userCommentsFilename, JSON.stringify(userComments));
  return insertedUserComment;
}

export function deleteUserComment(eventId, userComment) {
  const fileData = fs.readFileSync(userCommentsFilename);
  const userComments = JSON.parse(fileData);
  let deletedUserComment = {};
  const filteredUserComments = userComments.filter((item) => {
    const itemFound = (
      item.email !== userComment.email ||
      item.name !== userComment.name ||
      item.text !== userComment.text
    );
    if (itemFound) {
      deletedUserComment = item;
    }
    return !itemFound;
  });
  fs.writeFileSync(filteredUserComments, JSON.stringify(userComments));
  return deletedUserComment;
}
