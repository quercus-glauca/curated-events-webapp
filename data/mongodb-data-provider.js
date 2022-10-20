//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MONGODB Data Provider - Backend Server
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { MongoClient, ObjectId } from "mongodb";
import _ from "lodash";

const mongodbUrl = process.env.MONGODB_LOCALSERVER_URL;
const curatedEventsDBName = 'curatedEventsDB';
const curatedEventsCollectionName = 'curatedEvents';
const userRegistryCollectionName = 'userRegistry';
const userCommentsCollectionName = 'userComments';


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <<TODO>>


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § RegistrationData : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <<TODO>>


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function getUserComments(eventId) {
  // Connect to the MongoDB Database
  const client = new MongoClient(mongodbUrl);
  console.debug('[MONGODB] Connecting to the database...');

  try {
    await client.connect();
    console.debug('[MONGODB] Successfully connected!');

    // Find the Documents in the Collection
    const db = client.db(curatedEventsDBName);
    const collection = db.collection(userCommentsCollectionName);
    const queryFilter = { eventId };
    const cursor = collection.find(queryFilter);
    const userComments = [];
    await cursor.forEach((item) => {
      userComments.push(item);
    });

    // Check the 'result' and on FAILURE return an Error string
    // <<TODO>>

    // On SUCCESS return an Array of Documents
    return userComments;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.debug('[MONGODB] Connection closed.');
  }
}

export async function postUserComment(eventId, userComment) {
  // Connect to the MongoDB Database
  const client = new MongoClient(mongodbUrl);
  console.debug('[MONGODB] Connecting to the database...');

  try {
    await client.connect();
    console.debug('[MONGODB] Successfully connected!');

    // Insert the Document into the Collection
    const db = client.db(curatedEventsDBName);
    const collection = db.collection(userCommentsCollectionName);
    const insertedUserComment = {
      _id: new ObjectId(),
      eventId: eventId,
      date: userComment.date || new Date().toISOString(),
      email: userComment.email,
      name: userComment.name,
      text: userComment.text,
    };
    const result = await collection.insertOne(insertedUserComment);

    // Check the 'result' and on FAILURE return an Error string
    console.debug('[MONGODB] result:', result);
    if (!("acknowledged" in result) || !result.acknowledged) {
      return 'Failed to insert the user comment into the database collection';
    }

    // On SUCCESS return the full Document with its final '_id'
    return insertedUserComment;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.debug('[MONGODB] Connection closed.');
  }
}

export async function deleteUserComment(eventId, userComment) {
  // Connect to the MongoDB Database
  const client = new MongoClient(mongodbUrl);
  console.debug('[MONGODB] Connecting to the database...');

  try {
    await client.connect();
    console.debug('[MONGODB] Successfully connected!');

    // Delete the Document from the Collection
    const db = client.db(curatedEventsDBName);
    const collection = db.collection(userCommentsCollectionName);
    const queryFilter = {
      _id: (typeof userComment._id === "string" && userComment._id.length === 24)
        ? new ObjectId(userComment._id)
        : userComment._id,
    };
    const result = await collection.findOneAndDelete(queryFilter);

    // Check the 'result' and on FAILURE return an Error string
    console.debug('[MONGODB] result:', result);
    if (_.isEmpty(result) || !("acknowledged" in result) || !result.acknowledged) {
      return 'Failed to find and delete the user comment in the database collection';
    }

    // On SUCCESS return the full Document
    const deletedUserComment = result.value;
    return deletedUserComment;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.debug('[MONGODB] Connection closed.');
  }
}

