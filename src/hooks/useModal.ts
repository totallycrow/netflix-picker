import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const useModal = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      if (url.includes("#")) {
        setError(
          "Error Code: 127. Cannot load the requested data. Please contact the support."
        );
        onOpen();
      }
    };

    router.events.on("hashChangeComplete", onHashChangeStart);

    return () => {
      router.events.off("hashChangeComplete", onHashChangeStart);
    };
  }, [router.events, onOpen]);

  return { isOpen, onOpen, onClose, error };
};
