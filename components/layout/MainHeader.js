import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ButtonLink from 'components/ui/ButtonLink';
import classes from './MainHeader.module.css';

export default function MainHeader(props) {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  const welcomeNavigationBar = () => (
    <div>
      <Link href='/login'>Login</Link>
    </div>
  );

  const authenticatedNavigationBar = () => (
    <>
      <div>
        <Link href='/profile'>Profile</Link>
      </div>
      <div>
        <ButtonLink href='#' small={true}>Logout</ButtonLink>
      </div>
    </>
  );

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>Curated Events</Link>
      </div>
      <nav className={classes.navigation}>
        <div>
          <Link href='/events'>All Events</Link>
        </div>
        {!isAuthenticated ? welcomeNavigationBar() : authenticatedNavigationBar()}
      </nav>
    </header>
  );
}
