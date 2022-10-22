import { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../../context/NotificationProvider';
import { getUserComments } from '../../data/api-client-fetcher';
import classes from './CommentList.module.css';

function CommentList(props) {
  const { eventId, parentRef, updateList } = props;
  const { showNotification, hideNotification } = useContext(NotificationContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    showNotification('pending', "Comments", "Loading comments...");
    getUserComments(eventId)
      .then((result) => {
        if (result.ok) {
          hideNotification();
          setComments(result.essence);
          parentRef.current.scrollIntoView({ behavior: "smooth" });
        }
        else {
          showNotification('error', "Comments", `${result.essence}`);
        }
      })
      .catch((error) => {
        const status = error.code || error.errno || error.syscall || 418;
        showNotification('error', "Comments", `Error (${status}): ${error.message}`);
      });

  }, [updateList]);

  return (
    <ul className={classes.comments}>
      {comments.map((comment, index) => {
        return (
          <li key={index}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
