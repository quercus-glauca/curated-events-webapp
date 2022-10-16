//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FILESYSTEM Data Provider - Backend Server
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import fs from 'fs';
import path from 'path';

const userCommentsFilename = path.join(process.cwd(), 'data', 'fs-data-comments.json');

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
