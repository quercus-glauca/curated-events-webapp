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
      .then((item) => {
        if (typeof item === "string") {
          // Failed
          // <<TODO>> UI Feedback
          console.log('New comment result: Failed!', item);
        }
        else {
          // Succeeded
          // <<TODO>> UI Feedback
          console.log('New comment result: Succeeded!');
        }
      })
      .catch((error) => {
        console.error(error);
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
