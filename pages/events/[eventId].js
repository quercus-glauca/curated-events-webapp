import { Fragment } from 'react';
import Head from 'next/head';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Button from '../../components/ui/Button';
import CommentsSection from '../../components/input/CommentsSection';
import {
  getFeaturedEvents,
  getFeaturedEventsSync,
  getEventById,
  getEventByIdSync
} from "../../data/providers";

export default function EventDetailPage(props) {
  const isLoading = !('done' in props);
  if (isLoading) {
    return <ErrorAlert loading><p>Loading...</p></ErrorAlert>;
  }

  const { eventId, eventPost } = props;
  if (!eventPost) {
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
        <title>{eventPost.data.title}</title>
        <meta name="description" content={eventPost.data.description}
        />
      </Head>
      <EventSummary title={eventPost.data.title} />
      <EventLogistics
        date={eventPost.data.date}
        address={eventPost.data.location}
        image={eventPost.data.image}
        imageAlt={eventPost.data.title}
      />
      <EventContent>
        <p>{eventPost.data.description}</p>
      </EventContent>
      <CommentsSection eventId={eventPost.data.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  let { eventId, eventPost } = params;
  if (!eventPost) {
    eventPost = process.env.EVENTS_PROVIDER_SYNC
      ? getEventByIdSync(eventId)
      : await getEventById(eventId);
  }

  return {
    props: {
      done: true,
      eventId: eventId,
      eventPost: eventPost,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const featuredEvents = process.env.EVENTS_PROVIDER_SYNC
    ? getFeaturedEventsSync()
    : await getFeaturedEvents();

  const featuredParams = featuredEvents.map((event) => ({
    params: {
      eventId: event.data.id,
      eventPost: event
    },
  }));

  return {
    paths: featuredParams,
    fallback: true,
  };
}
