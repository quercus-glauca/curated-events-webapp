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
        <Markdown
          children={content}
          components={{
            ul: ({ node, ...props }) => {
              return <ul className={classes.listNode} {...props} />
            },
            li: ({ node, ...props }) => {
              return <li className={classes.listItem} {...props} />
            },
          }}
        />
      </section>
    </Fragment>
  );
}

export default EventContent;
