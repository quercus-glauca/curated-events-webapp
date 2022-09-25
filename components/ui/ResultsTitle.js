import { Fragment } from 'react';
import Head from 'next/head';
import Button from '../ui/button';
import classes from '../../styles/ResultsTitle.module.css';

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Fragment>
      <Head>
        <title>Events in {humanReadableDate}</title>
      </Head>
      <section className={classes.title}>
        <h1>Events in {humanReadableDate}</h1>
        <Button toLink='/events'>Show all events</Button>
      </section>
    </Fragment>
  );
}

export default ResultsTitle;
