import EventItem from "./EventItem";
import classes from "./EventList.module.css";

export default function EventList(props) {
  const { listEvents } = props;

  return (
    <ul className={classes.list}>
      {listEvents.map((event) => (
        <EventItem
          key={event.data.id}
          id={event.data.id}
          title={event.data.title}
          description={event.data.description}
          location={event.data.location}
          date={event.data.date}
          image={event.data.image}
          isFeatured={event.data.isFeatured}
        />
      ))}
    </ul>
  );
}