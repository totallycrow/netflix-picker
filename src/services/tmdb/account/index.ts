import { IUserId, IUserIdSuccess } from "../../../types/accountTypes";
import { ITokenSuccess, RequestError } from "../../../types/fetchingTypes";
import {
  IFavouriteMoviesList,
  IMoviesSuccess,
} from "../../../types/moviesTypes";
import moviesAPI from "../moviesAPI";
import { generateFavouritesQuery } from "../utils";

export const getToken = async (): Promise<ITokenSuccess | RequestError> => {
  const data = await moviesAPI.fetcher<ITokenSuccess>({
    endpointType: "getToken",
  });

  if (!data.success) {
    return data;
  }

  return {
    success: true,
    expires_at: data.payload.expires_at,
    request_token: data.payload.request_token,
  };
};

export const getUserId = async (
  userId: string
): Promise<IUserId | RequestError> => {
  const data = await moviesAPI.fetcher<IUserIdSuccess>({
    endpointType: "getUserId",
    userId,
  });
  console.log(data);

  if (!data.success) {
    return data;
  }

  return {
    userId: data.payload.id,
  };
};

export const setFavourite = async (
  accountId: string,
  sessionId: string,
  movieId: string,
  isFavourite: boolean
) => {
  const URL = `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`;
  const query = generateFavouritesQuery(movieId, isFavourite);
  try {
    const result = await fetch(URL, query);
    return result;
  } catch (e) {
    return e;
  }
};

export const isFavourite = async (
  userId: string,
  sessionId: string,
  movieId: string
) => {
  // fetch all favourites of the user
  const movies = await moviesAPI.getFavouriteMovies(userId, sessionId);

  if (!movies || "errorMessage" in movies) return false;

  const favMoviesIds = movies.favouriteMoviesList.map((movie) => movie.id);

  const isFav = favMoviesIds.some((id) => {
    return String(movieId) === String(id);
  });

  return isFav;
};

export const getFavouriteMovies = async (
  userId: string,
  sessionId: string
): Promise<IFavouriteMoviesList | RequestError> => {
  const data = await moviesAPI.fetcher<IMoviesSuccess>({
    endpointType: "getFavouriteMovies",
    sessionId,
    userId,
  });
  console.log(data);

  if (!data.success) {
    return data;
  }

  return {
    favouriteMoviesList: data.payload.results,
  };
};
