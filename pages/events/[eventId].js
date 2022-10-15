import { Fragment } from 'react';
import Head from 'next/head';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Button from '../../components/ui/Button';
import Comments from '../../components/input/comments';
import { getFeaturedEvents, getEventById } from "../../data/server-data-provider";

export default function EventDetailPage(props) {
  const isLoading = !('done' in props);
  if (isLoading) {
    return <ErrorAlert loading><p>Loading...</p></ErrorAlert>;
  }

  const { eventId, event } = props;
  if (!event) {
    return (
      <Fragment>
        <ErrorAlert><p>No event found!<br />Unknown '{eventId}' id.</p></ErrorAlert>
        <div className='center'>
          <Button toLink='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
        <Head>
          <title>{event.title}</title>
          <meta name="description" content={event.description}
          />
        </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  let { eventId, event } = params;
  if (!event) {
    event = await getEventById(eventId);
  }

  return {
    props: {
      done: true,
      eventId: eventId,
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();
  const featuredParams = featuredEvents.map((event) => ({
    params: {
      eventId: event.id,
      event: event
    },
  }));

  return {
    paths: featuredParams,
    fallback: true,
  };
}
