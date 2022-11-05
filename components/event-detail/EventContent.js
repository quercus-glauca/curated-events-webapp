import Image from 'next/image';
import { Fragment } from 'react';
import Markdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/hljs/cpp';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/cjs/styles/hljs/github';
import { getImageSource } from 'lib/helpers/events';
import classes from './EventContent.module.css';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('cpp', cpp);

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
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={docco}
                  children={String(children).replace(/\n$/, '')}
                  showLineNumbers={false}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        />
      </section>
    </Fragment>
  );
}

export default EventContent;
