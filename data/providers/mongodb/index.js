//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MONGODB Data Provider - Backend Server
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { MongoClient, ObjectId } from "mongodb";
import _ from "lodash";

export {
  getUserProfile,
  postSignupData,
  deleteUserProfile,
  getUserComments,
  postUserComment,
  deleteUserComment,
};

const mongodbUrl = process.env.MONGODB_LOCALSERVER_URL;
const curatedEventsDBName = 'curatedEventsDB';
const curatedEventsCollectionName = 'curatedEvents';
const userRegistryCollectionName = 'userRegistry';
const userProfilesCollectionName = 'userProfiles';
const userCommentsCollectionName = 'userComments';


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Helpers : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function connectMongoClient() {
  const client = new MongoClient(mongodbUrl);
  console.debug('[MONGODB] Connecting to the database...');
  await client.connect();
  console.debug('[MONGODB] Successfully connected!');
  return client;
}

async function closeMongoClient(client) {
  if (client) {
    await client.close();
  }
  console.debug('[MONGODB] Connection closed.');
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <<TODO>>


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § RegistrationData : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <<TODO>>


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § SignupData : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find the 'signupData' (userProfile) in the Database Collection
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getUserProfile(userEmail) {
  let client;
  let providerResult;
  try {
    client = await connectMongoClient();
    const db = client.db(curatedEventsDBName);
    const collection = db.collection(userProfilesCollectionName);
    const queryFilter = { email: userEmail };
    const userProfile = await collection.findOne(queryFilter);
    providerResult = !userProfile
      ? 'Sorry, but this user does not exist... yet!'
      : userProfile;
    await closeMongoClient(client);
    return providerResult;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
    closeMongoClient(client);
    throw (error);
  }
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Insert the 'signupData' (userProfile) into the Database Collection
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function postSignupData(signupData) {
  let client;
  let providerResult;
  try {
    client = await connectMongoClient();
    const db = client.db(curatedEventsDBName);
    const collection = db.collection(userProfilesCollectionName);

    // Check if the user profile already exists
    const queryFilter = { email: signupData.email };
    const partialResult = await collection.findOne(queryFilter);
    if (partialResult !== null) {
      providerResult = 'The user profile already exists!';
    }
    else {
      // Proceed with insertion
      const userProfile = {
        _id: new ObjectId(),
        date: new Date().toISOString(),
        email: signupData.email,
        name: signupData.name,
        password: signupData.password,
      };
      const result = await collection.insertOne(userProfile);

      // Check the 'result' and on FAILURE return an Error string
      // On SUCCESS return the full Document with its final '_id'
      console.debug('[MONGODB] result:', result);
      providerResult = (!("acknowledged" in result) || !result.acknowledged)
        ? 'Failed to insert the user profile into the database collection!'
        : userProfile;
    }

    await closeMongoClient(client);
    return providerResult;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
    closeMongoClient(client);
    throw (error);
  }
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Delete the 'signupData' (userProfile) from the Database Collection
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function deleteUserProfile(userEmail) {
  // <<TODO>>
  return null;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § UserComments : ASYNC Backend Implementation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Find all the 'userComments' in the Database Collection
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getUserComments(eventId) {
  let client;
  try {
    client = await connectMongoClient();
    const db = client.db(curatedEventsDBName);
    const collection = db.collection(userCommentsCollectionName);
    const queryFilter = { eventId };
    const sortFilter = { date: -1 };
    const cursor = collection.find(queryFilter).sort(sortFilter);
    const userComments = [];
    await cursor.forEach((item) => {
      userComments.push(item);
    });

    // Check if there are more 'batches' of data
    // Limit the number of returned Documents per 'batch'
    // <<TODO>>

    // Check the 'result' and on FAILURE return an Error string
    // On SUCCESS return an Array of Documents
    const providerResult = userComments;

    await closeMongoClient(client);
    return providerResult;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
    closeMongoClient(client);
    throw (error);
  }
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Insert the 'userComment' into the Database Collection
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function postUserComment(eventId, userComment) {
  let client;
  try {
    client = await connectMongoClient();
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
    // On SUCCESS return the full Document with its final '_id'
    console.debug('[MONGODB] result:', result);
    const providerResult = (!("acknowledged" in result) || !result.acknowledged)
      ? 'Failed to insert the user comment into the database collection!'
      : insertedUserComment;

    await closeMongoClient(client);
    return providerResult;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
    closeMongoClient(client);
    throw (error);
  }
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Delete the 'userComment' from the Database Collection
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function deleteUserComment(eventId, userComment) {
  let client;
  try {
    client = await connectMongoClient();
    const db = client.db(curatedEventsDBName);
    const collection = db.collection(userCommentsCollectionName);
    const queryFilter = {
      _id: (typeof userComment._id === "string" && userComment._id.length === 24)
        ? new ObjectId(userComment._id)
        : userComment._id,
    };
    const result = await collection.findOneAndDelete(queryFilter);

    // Check the 'result' and on FAILURE return an Error string
    // On SUCCESS return the full Document
    console.debug('[MONGODB] result:', result);
    const providerResult = (_.isEmpty(result) || !("acknowledged" in result) || !result.acknowledged)
      ? 'Failed to find and delete the user comment in the database collection!'
      : result.value;

    await closeMongoClient(client);
    return providerResult;
  }
  catch (error) {
    console.error('[MONGODB] Error:', error);
    closeMongoClient(client);
    throw (error);
  }
}
