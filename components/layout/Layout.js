import { Fragment, useContext } from "react";
import { NotificationContext } from "../../context/NotificationProvider";
import Notification from "../ui/notification";
import MainHeader from "./MainHeader";

export default function Layout(props) {
  const {
    isNotificationVisible,
    lastNotification,
    hideNotification
  } = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {isNotificationVisible && (<Notification
        notification={lastNotification}
        hideNotification={hideNotification}
      />)}
    </Fragment>
  );
}