import { useContext, useEffect, useRef, useState } from 'react';
import { NotificationContext } from '../../context/NotificationProvider';
import CommentList from './CommentList';
import NewCommentForm from './NewCommentForm';
import { postUserComment } from '../../data/api-client-fetcher';
import classes from './CommentsSection.module.css';

function CommentsSection(props) {
  const { eventId } = props;
  const { showNotification } = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const commentsSectionRef = useRef();

  useEffect(() => {
    commentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }, [showComments])

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

    showNotification('pending', "Comments", "Sending your comment...");

    postUserComment(eventId, toInsertUserComment)
      .then((result) => {
        if (result.ok) {
          showNotification('success', "Comments", result.greeting);
        }
        else {
          showNotification('error', "Comments", `${result.essence}`);
        }
      })
      .catch((error) => {
        const status = error.code || error.errno || error.syscall || 418;
        showNotification('error', "Registration", `Error (${status}): ${error.message}`);
      });
  }

  return (
    <section className={classes.comments} ref={commentsSectionRef}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewCommentForm
        onAddComment={addCommentHandler}
      />}
      {showComments && <CommentList
        eventId={eventId}
      />}
    </section>
  );
}

export default CommentsSection;
