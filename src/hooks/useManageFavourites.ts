import React, { useState } from "react";
import moviesAPI, { IMovie } from "../services/tmdb/moviesAPI";

const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";

export default function useManageFavourites(
  isFavourite: boolean,
  loginData: ILoginData,
  payload: IMovie
) {
  const { userId, sessionId, isAuth } = loginData;
  const { poster_path, id } = payload;

  const [fav, setFav] = useState(isFavourite);
  const imagePath = imgBaseUrl + poster_path;

  const setFavourite = (favouriteStatus: boolean) => {
    if (isAuth) {
      moviesAPI.setFavourite(userId, sessionId, id, favouriteStatus);
      setFav(favouriteStatus);
    }
  };

  return { imagePath, setFavourite, fav };
}

interface IMovieProps {
  isFavourite: boolean;
  loginData: ILoginData;
  payload: IMovie;
}

interface ILoginData {
  isLoggedIn: boolean;
  isAuth: boolean;
  sessionId: string;
  userId: any;
  message: string;
  lastValidated: string;
}
