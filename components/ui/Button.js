import Link from 'next/link';
import classes from './Button.module.css';

export default function Button(props) {
  const { toLink } = props;

  if (toLink) {
    return (
      <Link href={toLink}>
        <a className={classes.btn}>
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );

}