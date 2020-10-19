import React from 'react';
import Head from 'next/head';
import Auth from '../utility/auth';
import CMSControl from '../utility/CMSControl';

import '../utility/firebase';

import '../assets/fonts/style.css';
import '../app.css';

// // Only execute on client side
// if (typeof window !== 'undefined') {
//   // Initialize firebase analytics
//   firebase.analytics();
// }

function MyApp({ Component, pageProps }) {
  return (
    // <CMSControl>
    <Auth>
      <Head>
        <title>nwPlus CMS</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
        />
      </Head>
      <Component {...pageProps} />
    </Auth>
    // </CMSControl>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
