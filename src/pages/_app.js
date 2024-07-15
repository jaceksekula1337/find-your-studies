import Head from "next/head";
import { React } from "react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="bg-dark-blue">
      <Head>
        <title>Next.js</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
