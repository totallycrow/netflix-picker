import { useRouter } from "next/router";
import React from "react";

export const useButtonHandler = () => {
  const router = useRouter();

  const goToMovie = (movieId: string) => {
    router.push("http://localhost:3000/movies/" + movieId);
  };

  return { goToMovie };
};
