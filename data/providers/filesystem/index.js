//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FILESYSTEM Data Provider - Backend Server
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import * as fs from 'fs';
import path from 'path';
import {
  isEventFeatured,
  isEventFiltered,
  isEventId
} from 'lib/helpers/events';
import {
  readEventPost
} from 'lib/helpers/core';

export {
  getAllEvents,
  getFeaturedEvents,
  getFilteredEvents,
  getEventById,
  postSingleEvent,
  getUserComments,
  postUserComment,
  deleteUserComment,
};

const eventsDirectory = path.join(process.cwd(),
  'content', 'events');

const userCommentsFilename = path.join(process.cwd(),
  'content', 'comments', 'user-comments.json');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find all the 'events'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getAllEvents() {
  const allEvents = [];

  const filenames = fs.readdirSync(eventsDirectory);
  filenames.forEach(filename => {
    if (path.extname(filename).toLowerCase() === '.md') {
      const eventFilePath = path.join(eventsDirectory, filename);
      const eventPost = readEventPost(eventFilePath);
      allEvents.push(eventPost);
    }
  });

  allEvents.sort((a, b) => a.data.date - b.data.date);

  console.debug(`[SRV] Found ${allEvents.length} Events`);
  return allEvents;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find the featured 'events'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getFeaturedEvents() {
  const filteredEvents = [];

  const filenames = fs.readdirSync(eventsDirectory);
  filenames.forEach(filename => {
    if (path.extname(filename).toLowerCase() === '.md') {
      const eventFilePath = path.join(eventsDirectory, filename);
      const eventPost = readEventPost(eventFilePath);
      if (isEventFeatured(eventPost)) {
        filteredEvents.push(eventPost);
      }
    }
  });

  filteredEvents.sort((a, b) => a.data.date - b.data.date);

  console.debug(`[SRV] Found ${filteredEvents.length} "Featured" Events`);
  return filteredEvents;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find the filtered 'events'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getFilteredEvents(dateFilter) {
  const filteredEvents = [];

  const filenames = fs.readdirSync(eventsDirectory);
  filenames.forEach(filename => {
    if (path.extname(filename).toLowerCase() === '.md') {
      const eventFilePath = path.join(eventsDirectory, filename);
      const eventPost = readEventPost(eventFilePath);
      if (isEventFiltered(eventPost, dateFilter)) {
        filteredEvents.push(eventPost);
      }
    }
  });

  filteredEvents.sort((a, b) => a.data.date - b.data.date);

  console.debug(`[SRV] Found ${filteredEvents.length} "Filtered" Events`);
  return filteredEvents;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find a single 'event'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getEventById(id) {
  let event = null;

  const filenames = fs.readdirSync(eventsDirectory);
  filenames.forEach(filename => {
    if (path.extname(filename).toLowerCase() === '.md') {
      const eventFilename = path.basename(filename, path.extname(filename));
      if (eventFilename.toLowerCase() === id.toLowerCase()) {
        const eventFilePath = path.join(eventsDirectory, filename);
        const eventPost = readEventPost(eventFilePath);
        event = eventPost;
      }
    }
  });

  if (!event) {
    console.debug(`[SRV] Event '${id}' Not Found!`);
  }
  else {
    console.debug(`[SRV] Found '${id}' Event`);
  }
  return event;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Post a new 'event'
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function postSingleEvent(eventData, eventContent) {
  // <<TODO>>

  return false;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : SYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getUserComments(eventId) {
  const fileData = fs.readFileSync(userCommentsFilename);
  const userComments = JSON.parse(fileData);
  const filteredUserComments = userComments.filter((item) => (
    !('eventId' in item) || item.eventId !== eventId
  ));
  return filteredUserComments;
}

function postUserComment(eventId, userComment) {
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

function deleteUserComment(eventId, userComment) {
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
