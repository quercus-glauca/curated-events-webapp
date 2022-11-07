import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  isNotificationVisible: false,
  lastNotification: { status: '', title: '', message: '' },
  lastRedirect: { redirect: false, pathname: '', action: 'none' },
  showNotification: (status, title, message) => { },
  thenRedirect: (redirect, pathname, action) => { },
  hideNotification: () => { },
});

export default function NotificationProvider(props) {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [lastNotification, setLastNotification] = useState({
    status: 'success',
    title: 'Notification Bar',
    message: 'This is the notification bar used to show messages to the user'
  });
  const [lastRedirect, setLastRedirect] = useState({
    redirect: false,
    pathname: '',
    action: 'none'
  });
  const router = useRouter();

  useEffect(() => {
    if (lastRedirect.redirect && !isNotificationVisible) {
      if (lastRedirect.action === 'push') {
        router.push(lastRedirect.pathname);
      }
      else if (lastRedirect.action === 'replace') {
        router.replace(lastRedirect.pathname);
      }
      else if (lastRedirect.action === 'back') {
        router.back();
      }
      setLastRedirect({ redirect: false, pathname: '', action: 'none' });
    }
  }, [isNotificationVisible, lastRedirect]);

  function showNotification(status, title, message) {
    setLastNotification({ status, title, message });
    setIsNotificationVisible(true);
  }

  function thenRedirect(redirect, pathname, action) {
    setLastRedirect({ redirect, pathname, action });
  }

  function hideNotification() {
    setIsNotificationVisible(false);
  }

  return (
    <NotificationContext.Provider value={{
      isNotificationVisible,
      lastNotification,
      lastRedirect,
      showNotification,
      thenRedirect,
      hideNotification,
    }}>
      {props.children}
    </NotificationContext.Provider>
  );
}