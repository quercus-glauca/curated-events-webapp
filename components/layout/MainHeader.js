import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ButtonLink from 'components/ui/ButtonLink';
import classes from './MainHeader.module.css';

export default function MainHeader(props) {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  function handleSignOut() {
    signOut({ callbackUrl: '/' });
  }

  const welcomeNavigationBar = () => (
    <div>
      <Link href='/auth/login'>Login</Link>
    </div>
  );

  const authenticatedNavigationBar = () => (
    <>
      <div>
        <Link href='/auth/profile'>Profile</Link>
      </div>
      <div>
        <ButtonLink small={true} onClick={handleSignOut}>Logout</ButtonLink>
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
