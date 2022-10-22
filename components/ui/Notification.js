import { useEffect } from 'react';
import classes from './Notification.module.css';

const delayToHideInSeconds = 10;

function Notification(props) {
  const { title, message, status } = props.notification;

  let statusClasses = '';
  if (status === 'success') {
    statusClasses = classes.success;
  }
  else if (status === 'error') {
    statusClasses = classes.error;
  }
  else if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.hideNotification();
    }, delayToHideInSeconds * 1000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div className={activeClasses} onClick={props.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
