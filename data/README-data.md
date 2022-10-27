## Server-side data providers

The `data/providers` directory contains the various server-side **data providers** to get access to the different **data categories** used by the application. They can be alternativelly selected at _build time_ with the corresponding **environment variable**, namely:

- `EVENTS_PROVIDER=""`
- `COMMENTS_PROVIDER=""`
- `USERS_PROVIDER=""`

Each environment variable can take one the following **values**:

- `="dummy"`, to use the **dummy data provider**, located in the `data/providers/dummy` directory, which provides and manages _hardcoded values_ for each implemented data category: EVENTS, and COMMENTS.

- `="filesystem"`, to use the **File system data provider**, located in the `data/providers/filesistem` directory, which provides and manages _local files_ for each implemented data category: EVENTS.

- `="firebase"`, to use the **Firebase data provider**, located in the `data/providers/firebase` directory, which provides and manages _an external Firebase database_ for each implemented data category: EVENTS.

- `="mongodb"`, to use the **MongoDB data provider**, located in the `data/providers/mongodb` directory, which provides and manages _a local or remote MongoDB database_ for each implemented data category: COMMENTS.

Check out the `.env` and `.env.local` files for more details.