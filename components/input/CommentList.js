import { useState, useEffect } from 'react';
import { getUserComments } from '../../data/api-client-fetcher';
import classes from './CommentList.module.css';

function CommentList(props) {
  const { eventId } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserComments(eventId)
      .then((items) => {
        if (typeof items === "string") {
          // Failed
          const onFailComments = [{
            date: new Date().toISOString(),
            email: 'error@app.oh',
            name: 'Application Error',
            text: items,
          }];
          setComments(onFailComments);
        }
        else {
          // Succeeded
          setComments(items);
        }
      })
      .catch((error) => {
        console.error(error);
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
