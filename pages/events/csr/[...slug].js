import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/ui/ResultsTitle';
import ErrorAlert from '../../../components/ui/ErrorAlert';
import Button from '../../../components/ui/Button';
import { getFilteredEvents } from "../../../data/data-helper";

export default function FilteredEventsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [allEvents, setAllEvents] = useState();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error } = useSWR(process.env.FIREBASE_URL, fetcher);
  console.log('SWR Running...');

  useEffect(() => {
    if (error) {
      console.log('SWR Error:', error);
      setIsError(true);
    }
    if (data) {
      const events = [];
      Object.entries(data).forEach(([key, entry]) => {
        const event = {
          key,
          ...entry
        };
        events.push(event);
      });
      console.log('SWR Data:', events.length, 'Entries Fetched');
      setAllEvents(events);
      setIsLoading(false);
    }
  }, [data, error]);

  if (isLoading) {
    return <ErrorAlert loading><p>Loading...</p></ErrorAlert>;
  }

  if (isError) {
    return <ErrorAlert><p>Error: {JSON.stringify(error)}</p></ErrorAlert>;
  }

  const rawSlug = router.query.slug;
  const [queryYear, queryMonth] = rawSlug;
  let isFilterValid = false;
  let filterYear = 0;
  let filterMonth = 0;
  if (queryYear && queryMonth) {
    filterYear = parseInt(queryYear);
    filterMonth = parseInt(queryMonth);
    if (
      Number.isInteger(filterYear) && Number.isInteger(filterMonth) &&
      2020 <= filterYear && filterYear <= 2050 &&
      1 <= filterMonth && filterMonth <= 12
    ) {
      isFilterValid = true;
    }
  }
  if (!isFilterValid) {
    return (
      <Fragment>
        <ErrorAlert><p>Invalid input data: {JSON.stringify(rawSlug)}<br />Please, adjust your values...</p></ErrorAlert>
        <div className='center'>
          <Button toLink='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents(allEvents, { year: filterYear, month: filterMonth });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
        <div className='center'>
          <Button toLink='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredDate = new Date(filterYear, filterMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={filteredDate} />
      <EventList listEvents={filteredEvents} />
    </Fragment>
  );
}