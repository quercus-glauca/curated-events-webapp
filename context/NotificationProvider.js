import { createContext, useState } from "react";

export const NotificationContext = createContext({
  isNotificationVisible: false,
  lastNotification: { title: '', message: '', status: '' },
  showNotification: (title, message, status) => { },
  hideNotification: () => { }
});

export default function NotificationProvider(props) {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [lastNotification, setLastNotification] = useState({
    title: 'Notification Bar',
    message: 'This is the notification bar used to show messages to the user',
    status: 'success'
  });

  function showNotification(title, message, status) {
    setLastNotification({ title, message, status });
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
      props.children
    </NotificationContext.Provider>
  );
}