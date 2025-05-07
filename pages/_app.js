/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import "../public/css/globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SolanaProvider } from "../src/components/wallet/SolanaProvider";
import { RedirectProvider } from "../src/components/wallet/RedirectProvider";
import PreLoader from "../src/layout/PreLoader";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const LoadingContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <SolanaProvider>
        <QueryClientProvider client={queryClient}>
          <RedirectProvider>
            <LoadingContext.Provider value={{ loading, setLoading }}>
              {loading && <PreLoader />}
              <Component {...pageProps} />
            </LoadingContext.Provider>
          </RedirectProvider>
        </QueryClientProvider>
      </SolanaProvider>
    </Provider>
  );
}

export default MyApp;
