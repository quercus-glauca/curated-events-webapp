import Link from 'next/link';
import classes from './ButtonLink.module.css';

export default function ButtonLink(props) {
  const { toLink } = props;

  if (toLink) {
    return (
      <Link className={classes.btn} href={toLink}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );

}