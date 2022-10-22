import { createContext, useState } from "react";

export const NotificationContext = createContext({
  isNotificationVisible: false,
  lastNotification: { status: '', title: '', message: '' },
  showNotification: (status, title, message) => { },
  hideNotification: () => { }
});

export default function NotificationProvider(props) {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [lastNotification, setLastNotification] = useState({
    status: 'success',
    title: 'Notification Bar',
    message: 'This is the notification bar used to show messages to the user'
  });

  function showNotification(status, title, message) {
    setLastNotification({ status, title, message });
    setIsNotificationVisible(true);
  }

  function hideNotification() {
    setIsNotificationVisible(false);
  }

  return (
    <NotificationContext.Provider value={{
      isNotificationVisible,
      lastNotification,
      showNotification,
      hideNotification
    }}>
      {props.children}
    </NotificationContext.Provider>
  );
}