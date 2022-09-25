import { Fragment } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import EventsSearch from "../../components/events/EventsSearch";
import EventList from "../../components/events/EventList";
import { fetchAllEvents } from "../../data/data-provider";

export default function AllEventsPage(props) {
  const { allEvents } = props;
  const router = useRouter();

  function handleFindEvents(year, month) {
    console.log(`Finding Events For: ${year}, ${month}`);
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
      </Head>
      <EventsSearch onFindEvents={handleFindEvents} />
      <EventList listEvents={allEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await fetchAllEvents();

  return {
    props: { 
      allEvents: allEvents 
    },
    revalidate: 60,
  };
}