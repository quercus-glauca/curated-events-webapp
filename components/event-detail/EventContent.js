import Image from 'next/image';
import { Fragment } from 'react';
import Markdown from 'react-markdown';
import { getImageSource } from 'lib/helpers/events';
import classes from './EventContent.module.css';

function EventContent(props) {
  const { id, summary, content } = props;

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
            img: ({ node, src, alt, width, height, ...props }) => {
              const imageSource = getImageSource(id, src);
              const imageAlt = alt ? alt : data.title;
              return <Image className={classes.image} src={imageSource} alt={imageAlt} width={1200} height={1200} {...props} />
            },
          }}
        />
      </section>
    </Fragment>
  );
}

export default EventContent;
