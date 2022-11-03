//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Entry Point: /api/comments/[eventId]
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  getUserComments,
  getUserCommentsSync,
  postUserComment,
  postUserCommentSync,
  deleteUserComment,
  deleteUserCommentSync,
} from 'data/providers';

import {
  validateUserComment
} from 'lib/validate/input-data';

import {
  buildGetResponse,
  buildPostResponse,
  buildDeleteResponse,
  buildMethodNotAllowed,
  buildErrorResponse
} from 'lib/api/response-helper';


export default async function handler(req, res) {
  console.debug(`[API] ${req.method} /api/comments HANDLER BEGIN...`);

  let apiUrl = '/api/comments/[eventId]';
  let operationVerb = '';
  let operationDetails = '';
  let greetingOnSuccess = '';

  if (req.method === 'GET') {
    try {
      const eventId = req.query.eventId;
      apiUrl = `/api/comments/${eventId}`;
      operationVerb = 'find';
      operationDetails = `all the comments about the event '${eventId}'`;

      const userComments = (process.env.COMMENTS_PROVIDER_SYNC === "true")
        ? getUserCommentsSync(eventId)
        : await getUserComments(eventId);
      const [status, response] = buildGetResponse(
        apiUrl,
        userComments,
        operationVerb,
        operationDetails);
      res.status(status).json(response);
    }
    catch (error) {
      const [status, response] = buildErrorResponse(
        error,
        req.method,
        apiUrl,
        operationVerb,
        operationDetails
      );
      res.status(status).json(response);
    }
  }

  else if (req.method === 'POST') {
    try {
      const eventId = req.query.eventId;
      apiUrl = `/api/comments/${eventId}`;
      operationVerb = 'insert';
      operationDetails = `the new comment about the event '${eventId}'`;
      greetingOnSuccess = 'Thank you for your comment!';

      const userComment = req.body.userComment;
      const [inputAccepted, rejectedDetails] = validateUserComment(userComment);
      const insertedUserComment = (!inputAccepted
        ? rejectedDetails
        : ((process.env.COMMENTS_PROVIDER_SYNC === "true")
          ? postUserCommentSync(eventId, userComment)
          : await postUserComment(eventId, userComment))
      );

      const [status, response] = buildPostResponse(
        apiUrl,
        insertedUserComment,
        operationVerb,
        operationDetails,
        greetingOnSuccess);
      res.status(status).json(response);
    }
    catch (error) {
      const [status, response] = buildErrorResponse(
        error,
        req.method,
        apiUrl,
        operationVerb,
        operationDetails
      );
      res.status(status).json(response);
    }
  }

  else {
    const [status, response] = buildMethodNotAllowed(
      apiUrl,
      req.method);
    res.status(status).json(response);
  }

  console.debug(`[API] ${req.method} /api/comments HANDLER END`);
}