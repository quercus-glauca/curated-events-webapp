import { Fragment } from 'react';
import Head from 'next/head';
import NewsletterRegistration from 'components/input/NewsletterRegistration';
import EventList from "components/events/EventList";
import { getFeaturedEvents, getFeaturedEventsSync } from "data/providers";

export default function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <Fragment>
      <Head>
        <title>Curated Events</title>
      </Head>
      <NewsletterRegistration />
      <EventList listEvents={featuredEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = process.env.EVENTS_PROVIDER_SYNC
    ? getFeaturedEventsSync()
    : await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}