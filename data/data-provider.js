const urlDatabase = 'https://react-getting-started-83b11-default-rtdb.europe-west1.firebasedatabase.app/'
const urlCollection = `${urlDatabase}events.json`;

export const API_URL = urlCollection;

export async function fetchAllEvents() {
  let response = await fetch(urlCollection);
  console.log('Data Provider GET Response Status:', response.status, response.statusText);
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

  console.log('Data Provider:', allEvents.length, 'Entries Fetched');
  return allEvents;
}

export async function postEvent({ id, title, description, location, date, image, isFeatured }) {
  const entry = { id, title, description, location, date, image, isFeatured };
  let response = await fetch(urlCollection, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log('Data Provider POST Response Status:', response.status, response.statusText);
  if (response.status !== 200) {
    return false;
  }

  let data = await response.json();
  console.log('Data Provider POST Response Data:', data);
  return true;
}
