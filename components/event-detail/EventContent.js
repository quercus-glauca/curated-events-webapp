import { Fragment } from 'react';
import Markdown from 'react-markdown';
import classes from './EventContent.module.css';

function EventContent(props) {
  const { summary, content } = props;

  return (
    <Fragment>
      <section className={classes.summary}>
        {summary}
      </section>
      <section className={classes.content}>
        <Markdown>{content}</Markdown>
      </section>
    </Fragment>
  );
}

export default EventContent;
