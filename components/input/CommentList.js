import { useState, useEffect } from 'react';
import { getUserComments } from '../../data/api-client-fetcher';
import classes from './CommentList.module.css';

function CommentList(props) {
  const { eventId } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserComments(eventId)
      .then((result) => {
        if (result.ok) {
          setComments(result.essence);
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

  }, []);

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
