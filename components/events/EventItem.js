import Image from 'next/image';
import Button from '../ui/Button';
import classes from '../../styles/EventItem.module.css';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

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