import { ILoginData } from "../../types/accountTypes";
import { IMovie } from "../../types/moviesTypes";
import { erroredMovie } from "./static";

export const generateSessionQuery = (token: string) => {
  const queryBody = {
    request_token: token,
  };

  const query = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  };

  return query;
};

export const generateFavouritesQuery = (
  movieId: string,
  isFavourite: boolean
) => {
  const queryBody = {
    media_type: "movie",
    media_id: movieId,
    favorite: isFavourite,
  };

  const query = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  };

  return query;
};

export const selectMoviesFromList = (
  moviesList: IMovie[],
  numbersOfMovies: number
) => {
  let selectedMovies = [];

  for (let i = 0; i < numbersOfMovies; i++) {
    selectedMovies.push(moviesList[i]);
  }
  return selectedMovies;
};

export const generateErrorMovieObject = (loginData: ILoginData) => {
  return {
    props: {
      sharedData: {
        loginData: loginData,
      },
      sectionBody: {
        isFavourite: false,
        movieData: erroredMovie,
      },
    },
  };
};
