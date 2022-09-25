import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp
