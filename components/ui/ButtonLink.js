import Link from 'next/link';
import classes from './ButtonLink.module.css';

export default function ButtonLink(props) {
  const { toLink, small } = props;

  const btnClasses = [];
  btnClasses.push(classes.btn);
  if (small) {
    btnClasses.push(classes.btnSm);
  }

  if (toLink) {
    return (
      <Link className={btnClasses.join(' ')} href={toLink}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={btnClasses.join(' ')} onClick={props.onClick}>
      {props.children}
    </button>
  );

}