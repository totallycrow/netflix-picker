import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const {openModal, isModalOpened} = useModal()

  useEffect(() => {
    const onHashChangeStart = (url: any) => {
      // {?error_code=13
      console.log(
        "________---------__________--------**************************************"
      );
      console.log(`Path changing to ${url}`);
      alert("Test");
      // openModal
    };
    // router.events.on("hashChangeStart", onHashChangeStart);
    // return () => {
    //     router.events.off("hashChangeStart", onHashChangeStart);
    // };
    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Hydrate state={pageProps.dehydratedState}>
          {/* <ErrorModalProvider value={{openModal, isModalOpened}}> */}
          <Component {...pageProps} />
          {/* </ErrorModalProvider> */}
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
