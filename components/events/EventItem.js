import Image from 'next/image';
import Button from 'components/ui/Button';
import DateIcon from 'components/icons/DateIcon';
import AddressIcon from 'components/icons/AddressIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import classes from './EventItem.module.css';

export default function EventItem(props) {
  const { id, title, location, date, image } = props;

  const fmtDate = new Date(date).toLocaleString('en-US', { dateStyle: "full" });
  const fmtAddress = location.replace(", ", "\n");
  const toEventItem = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={image} width={300} height={300} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{fmtDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{fmtAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button toLink={toEventItem}>
            <span>Explore Event</span>
            <span className={classes.icon}><ArrowRightIcon /></span>
          </Button>
        </div>
      </div>
    </li>
  );
}