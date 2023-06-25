import * as React from 'react';
import '../style.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';

import appStore from "../store/store";
import { AppStoreContext } from "../context/AppStoreContext";


import AuthContext from '../context/AuthContext';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure({ ...awsconfig, ssr: true });
Auth.configure(awsconfig);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Avatar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <AuthContext>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppStoreContext.Provider value={appStore}>
            <Component {...pageProps} />
          </AppStoreContext.Provider>
        </ThemeProvider>
      </AuthContext>
    </CacheProvider>
  );
}