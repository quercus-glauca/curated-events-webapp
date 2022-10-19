import { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/ui/ResultsTitle';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Button from '../../components/ui/Button';
import { getFilteredEvents, getFilteredEventsSync } from "../../data/server-data-provider";

export default function FilteredEventsPage(props) {
  const isLoading = !('done' in props);
  if (isLoading) {
    return <ErrorAlert loading><p>Loading...</p></ErrorAlert>;
  }

  const { rawSlug, isFilterValid, filterYear, filterMonth, filteredEvents } = props;
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

export async function getServerSideProps(context) {
  const { params } = context;
  const slug = params.slug;
  const [queryYear, queryMonth] = slug;
  let isValid = false;
  let year = 0;
  let month = 0;
  if (queryYear && queryMonth) {
    year = parseInt(queryYear);
    month = parseInt(queryMonth);
    if (
      Number.isInteger(year) && Number.isInteger(month) &&
      2020 <= year && year <= 2050 &&
      1 <= month && month <= 12
    ) {
      isValid = true;
    }
  }
  const events = process.env.EVENTS_PROVIDER_SYNC
    ? getFilteredEventsSync({ year, month })
    : await getFilteredEvents({ year, month });

  return {
    props: {
      done: true,
      rawSlug: slug,
      isFilterValid: isValid,
      filterYear: year,
      filterMonth: month,
      filteredEvents: events,
    },
  };
}
