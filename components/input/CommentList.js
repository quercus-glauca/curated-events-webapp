import { useState, useEffect } from 'react';
import classes from './CommentList.module.css';

function CommentList(props) {
  const { eventId } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        console.log('API Message:', data.message);
        setComments(data.comments);
      })
      .catch((error) => console.log('API Error:', error));

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
