import { Fragment } from 'react';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/NewsletterRegistration';
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../data/server-data-provider";

export default function HomePage(props) {
  const { featuredEvents } = props;
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
      </Head>
      <NewsletterRegistration />
      <EventList listEvents={featuredEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}