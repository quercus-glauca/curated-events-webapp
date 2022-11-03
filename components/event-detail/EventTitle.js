import classes from './EventTitle.module.css';

function EventTitle(props) {
  const { title } = props;

  return (
    <section className={classes.title}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventTitle;