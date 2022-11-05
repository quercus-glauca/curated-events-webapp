import Image from 'next/image';
import AddressIcon from 'components/icons/AddressIcon';
import DateIcon from 'components/icons/DateIcon';
import { getImageSource } from 'lib/helpers/events';
import classes from './EventLogistics.module.css';
import LogisticsItem from './LogisticsItem';

function EventLogistics(props) {
  const { id, date, address, image, imageAlt } = props;

  const imageSource = getImageSource(id, image);
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={imageSource} alt={imageAlt} width={300} height={300} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
