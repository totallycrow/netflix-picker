import React, { useState } from "react";
import moviesAPI from "../services/tmdb/moviesAPI";
import { IMovie } from "../types/moviesTypes";

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
  const toggleFavourite = !fav;

  const setFavourite = () => {
    if (!isAuth) {
      alert("Log in to add to favourites");
      return;
    }
    moviesAPI.setFavourite(userId, sessionId, id, toggleFavourite);
    setFav(toggleFavourite);
  };

  console.log(fav);
  const buttonText = fav ? "Remove from Favourites" : "Add to Favourites";
  console.log(buttonText);

  return { imagePath, setFavourite, fav, buttonText };
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
