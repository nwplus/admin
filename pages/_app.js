import Head from 'next/head'
import React from 'react'
import CMSControl from '../utility/CMSControl'
import Auth from '../utility/auth'

import '../utility/firebase'
import 'react-quill/dist/quill.snow.css';
import '../app.css'
import '../assets/fonts/style.css'

// // Only execute on client side
// if (typeof window !== 'undefined') {
//   // Initialize firebase analytics
//   firebase.analytics();
// }

function MyApp({ Component, pageProps }) {
  return (
    <CMSControl>
      <Auth>
        <Head>
          <title>nwPlus CMS</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
            integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
            crossOrigin="anonymous"
            referrerpolicy="no-referrer"
          />
        </Head>
        <Component {...pageProps} />
      </Auth>
    </CMSControl>
  )
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

export default MyApp
