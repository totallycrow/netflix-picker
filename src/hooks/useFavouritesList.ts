import React, { useState } from "react";
import moviesAPI from "../services/tmdb/moviesAPI";
import { ILoginData } from "../types/accountTypes";
import { IMovie } from "../types/moviesTypes";

export const useFavouritesList = (
  favouriteMovies: IMovie[],
  loginData: ILoginData
) => {
  const [favList, setFavList] = useState(favouriteMovies);

  const removeFromFavList = async (movieId: string) => {
    const result = await moviesAPI.setFavourite(
      loginData.userId,
      loginData.sessionId,
      movieId,
      false
    );

    setFavList((list) => {
      const newList = list.filter(
        (listMovie) => String(movieId) !== String(listMovie.id)
      );
      return newList;
    });
  };

  return { favList, removeFromFavList };
};
