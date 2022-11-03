import fs from 'fs';
import matter from 'gray-matter';
import _ from 'lodash';

const MAX_EVENTID_LENGTH = 80;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : Utility Functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getEventIdFromTitle(eventTitle) {
  const kebabCase = _.kebabCase(eventTitle);
  const eventId = kebabCase
    .replace(/[^0-9a-zA-Z\s]/g, '-')
    .slice(0, MAX_EVENTID_LENGTH);
  return eventId;
}

export function isEventFeatured(event) {
  return event.data.isFeatured;
}

export function isEventFiltered(event, dateFilter) {
  const { year, month } = dateFilter;

  const eventDate = new Date(event.data.date);
  return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
}

export function isEventId(event, id) {
  const eventId = getEventIdFromTitle(event.data.title);
  return eventId === id;
}

export function readEventPost(eventFilePath) {
  const rawEventPost = fs.readFileSync(eventFilePath, 'utf-8');
  const { data, content } = matter(rawEventPost);
  const eventPost = { data, content };
  return eventPost;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Legacy Utility Functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function getFeaturedEvents(events) {
  const filteredEvents = events.filter((event) => event.isFeatured);
  console.debug('Data Helper:', filteredEvents.length, '"Featured" Events');

  return filteredEvents;
}

export function getFilteredEvents(events, dateFilter) {
  const { year, month } = dateFilter;

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
  console.debug('Data Helper:', filteredEvents.length, '"Filtered" Events');

  return filteredEvents;
}

export function getEventById(events, id) {
  const event = events.find((event) => event.id === id);
  if (!event) {
    console.debug('Data Helper: Event', id, 'Not Found!');
  }
  else {
    console.debug('Data Helper: Event', id, 'Found');
  }
  return event;
}
