# Data Providers

## Server-side data providers

The `data/providers` directory contains the various server-side **data providers** which manage and get access to the different **data categories** used by the application. They can be alternativelly selected at _build time_ with the corresponding **environment variable**, namely:

- `EVENTS_PROVIDER=""`
- `COMMENTS_PROVIDER=""`
- `USERS_PROVIDER=""`

Each environment variable can take one the following **values**:

- `="dummy"`, to use the **Dummy data provider**, located in the `data/providers/dummy` directory, which provides and manages _hardcoded values_ for each data category implemented by this data provider: EVENTS, and COMMENTS.

- `="filesystem"`, to use the **File system data provider**, located in the `data/providers/filesystem` directory, which provides and manages _local files_ for each data category implemented by this data provider: COMMENTS.

- `="firebase"`, to use the **Firebase data provider**, located in the `data/providers/firebase` directory, which provides and manages _an external Firebase database_ for each data category implemented by this data provider: EVENTS.

- `="mongodb"`, to use the **MongoDB data provider**, located in the `data/providers/mongodb` directory, which provides and manages _a local or remote MongoDB database_ for each data category implemented by this data provider: COMMENTS.

Check out the `.env` and `.env.local` files for more details.

# Data Categories

## EVENTS

The application `event` objects are all pre-fetched and pre-rendered at the Backend (SSG, SSR, ISR). The Frontend always receives the pages pre-populated with all their contents.

The **Dummy** and **Firebase** data providers are already using this type:

```js
const simpleEvent = {
  id: '',
  title: '',
  description: '',
  location: '',
  date: '2021-05-12',
  image: 'images/coding-event.jpg',
  isFeatured: false,
};
```

Now, we are introducing the **File system** data provider to also manage EVENTS. During this process, we will convert this type from JavaScript *objects* to Markdown *files* (and not JSON *files*!), because we are going to add **full rich-text content** to the EVENTS.

So,

- `sampleEvent` will become the event **metadata**, conveyed by the Markdown *gray-matter* `data` object.
- `sampleEvent.id` will become the **filename** for the corresponding local `*.md` file, located in the `content/events` directory.

The Markdown *content* `content` object will convey the new **full rich-text content** of the events, coverted this way into a full rich-text EVENT-POST:

```js
const eventPost = {
  data: { ...simpleEvent },
  content: "MD Formatted Content"
};
```

## COMMENTS

```js
```

## USERS

```js
```
