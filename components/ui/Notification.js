import { useEffect } from 'react';
import classes from './Notification.module.css';

const delayToHideInSeconds = 7;

export default function Notification(props) {
  const { status, title, message } = props.notification;

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
    if (status !== 'pending') {
      const timeoutId = setTimeout(() => {
        props.hideNotification();
      }, delayToHideInSeconds * 1000);

      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [status]);

  return (
    <div className={activeClasses} onClick={props.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
