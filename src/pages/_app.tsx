import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { useModal } from "../hooks/useModal";
import { ModalComponent } from "../components/modal/ModalComponent";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const { isOpen, onOpen, onClose, error } = useModal();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ModalComponent isOpen={isOpen} onClose={onClose} error={error} />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
