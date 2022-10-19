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
} from '../../../data/server-data-provider';

import {
  validateUserComment
} from '../../../helpers/comments-data-helper';

import {
  buildGetResponse,
  buildPostResponse,
  buildDeleteResponse,
  buildMethodNotAllowed
} from '../../../helpers/api-response-helper';


export default async function handler(req, res) {
  console.debug(`[API] ${req.method} /api/comments HANDLER BEGIN...`);

  if (req.method === 'GET') {
    try {
      const eventId = req.query.eventId;
      const userComments = (process.env.COMMENTS_PROVIDER_SYNC === "true")
        ? getUserCommentsSync(eventId)
        : await getUserComments(eventId);

      const [, status, response] = buildGetResponse(
        `/api/comments/${eventId}`,
        userComments,
        `all the comments about the event '${eventId}'`);
      console.debug(`[API] ${req.method} Responding to client...`);
      res.status(status).json(response);
    }
    catch (error) {
      console.error(`[API] ${req.method} Error:`, error);
      res.status(500).json(error);
    }
  }

  else if (req.method === 'POST') {
    try {
      const eventId = req.query.eventId;
      const userComment = req.body.userComment;

      const [inputAccepted, rejectedDetails] = validateUserComment(userComment);

      const insertedUserComment = (!inputAccepted
        ? rejectedDetails
        : ((process.env.COMMENTS_PROVIDER_SYNC === "true")
          ? postUserCommentSync(eventId, userComment)
          : await postUserComment(eventId, userComment))
      );

      const [, status, response] = buildPostResponse(
        `/api/comments/${eventId}`,
        insertedUserComment,
        `the new comment about the event '${eventId}'`);
      console.debug(`[API] ${req.method} Responding to client...`);
      res.status(status).json(response);
    }
    catch (error) {
      console.error(`[API] ${req.method} Error:`, error);
      res.status(500).json(error);
    }
  }

  else {
    const [, status, response] = buildMethodNotAllowed(
      "/api/comments",
      req.method);
    console.debug(`[API] ${req.method} Responding to client...`);
    res.status(status).json(response);
  }

  console.debug(`[API] ${req.method} /api/comments HANDLER END`);
}