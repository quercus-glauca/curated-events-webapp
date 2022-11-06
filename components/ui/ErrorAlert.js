import { Fragment } from 'react';
import Head from 'next/head';
import classes from './ErrorAlert.module.css';

export default function ErrorAlert(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.loading ? 'Loading...' : 'Warning!'}</title>
      </Head>
      <div className={classes.alert}>{props.children}</div>
    </Fragment>
  );
}
