import Head from 'next/head';
import Layout from 'components/layout/Layout';
import NotificationProvider from 'context/NotificationProvider';
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta
            name="description"
            content="Find a lot of great events that allow you to evolve..."
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
}

export default MyApp
