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