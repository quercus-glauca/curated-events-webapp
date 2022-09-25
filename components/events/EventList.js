import EventItem from "./EventItem";
import classes from "./EventList.module.css";

export default function EventList(props) {
  return (
    <ul className={classes.list}>
      {props.listEvents.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          image={event.image}
          isFeatured={event.isFeatured}
        />
      ))}
    </ul>
  );
}