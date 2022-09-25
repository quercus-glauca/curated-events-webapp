import { Fragment } from 'react';
import Head from 'next/head';
import EventList from "../components/events/EventList";
import { fetchAllEvents } from "../data/data-provider";
import { getFeaturedEvents } from "../data/data-helper";

export default function HomePage(props) {
  const { featuredEvents } = props;
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
      </Head>
      <EventList listEvents={featuredEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await fetchAllEvents();
  const featuredEvents = getFeaturedEvents(allEvents);

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}