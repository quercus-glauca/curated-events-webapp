import Link from 'next/link';
import classes from './ButtonLink.module.css';

export default function ButtonLink(props) {
  const { onClick, toLink, small } = props;

  const btnClasses = [];
  btnClasses.push(classes.btn);
  if (small) {
    btnClasses.push(classes.btnSm);
  }

  if (toLink) {
    return (
      <Link className={btnClasses.join(' ')} href={toLink} onClick={onClick}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={btnClasses.join(' ')} onClick={onClick}>
      {props.children}
    </button>
  );

}