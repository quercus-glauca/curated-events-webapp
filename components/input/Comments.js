import { useState } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';
import { postUserComment } from '../../data/api-client-fetcher';
import classes from './Comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(userComment) {
    const toInsertUserComment = {
      eventId: eventId,
      date: new Date().toISOString(),
      email: userComment.email,
      name: userComment.name,
      text: userComment.text
    };
    postUserComment(eventId, toInsertUserComment)
      .then((result) => {
        if (result.ok) {
          // <<TODO>>  Show/Notify SUCCESS to User
          console.log('New comment result: Succeeded!');
        }
        else {
          // <<TODO>> Show/Notify ERROR to User
          console.error(`[ERROR] Status: ${result.status}. Message:`, result.essence);
        }
      })
      .catch((error) => {
        // <<TODO>> Show/Notify ERROR to User
        const status = error.code || error.errno || error.syscall || 418;
        console.error(`[ERROR] Status: ${status}. Message:`, error.message);
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment
        onAddComment={addCommentHandler}
      />}
      {showComments && <CommentList
        eventId={eventId}
      />}
    </section>
  );
}

export default Comments;
