import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  // const {openModal, isModalOpened} = useModal()

  // useEffect(() => {
  //     const onHashChangeStart = (url) =>
  //         ?error_code=13
  //         console.log(`Path changing to ${url}`);
  //         openModal
  //     };
  //     router.events.on("hashChangeStart", onHashChangeStart);
  //     return () => {
  //         router.events.off("hashChangeStart", onHashChangeStart);
  //     };
  // }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* <ErrorModalProvider value={{openModal, isModalOpened}}> */}
        <Component {...pageProps} />
        {/* </ErrorModalProvider> */}
      </Hydrate>
    </QueryClientProvider>
  );
}
