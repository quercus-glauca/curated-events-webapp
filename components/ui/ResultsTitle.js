import { Fragment } from 'react';
import Head from 'next/head';
import ButtonLink from 'ui/button';
import classes from './ResultsTitle.module.css';

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
        <ButtonLink toLink='/events'>Show all events</ButtonLink>
      </section>
    </Fragment>
  );
}

export default ResultsTitle;
