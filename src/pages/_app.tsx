import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Button, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const {openModal, isModalOpened} = useModal()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  useEffect(() => {
    const onHashChangeStart = (url: any) => {
      // {?error_code=13
      console.log(
        "________---------__________--------**************************************"
      );
      console.log(url);
      console.log(`Path changing to ${router.asPath}`);

      if (url.includes("#")) {
        // alert("Test");
        setError(
          "Error Code: 127. Cannot load the requested data. Please contact the support."
        );
        onOpen();
      }

      // openModal
    };
    // router.events.on("hashChangeStart", onHashChangeStart);
    // return () => {
    //     router.events.off("hashChangeStart", onHashChangeStart);
    // };
    router.events.on("hashChangeComplete", onHashChangeStart);

    return () => {
      router.events.off("hashChangeComplete", onHashChangeStart);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{error}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Hydrate state={pageProps.dehydratedState}>
          {/* <ErrorModalProvider value={{openModal, isModalOpened}}> */}
          <Component {...pageProps} />
          {/* </ErrorModalProvider> */}
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
