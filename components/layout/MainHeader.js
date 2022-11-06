import Link from 'next/link';
import ButtonLink from 'components/ui/ButtonLink';
import classes from './MainHeader.module.css';

export default function MainHeader(props) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>Curated Events</Link>
      </div>
      <nav className={classes.navigation}>
        <div>
          <Link href='/events'>All Events</Link>
        </div>
        <div>
          <Link href='/login'>Login</Link>
        </div>
        <div>
          <Link href='/profile'>Profile</Link>
        </div>
        <div>
          <ButtonLink href='#' small={true}>Logout</ButtonLink>
        </div>
      </nav>
    </header>
  );
}

/* <header> Logo <nav> <ul> <li> */