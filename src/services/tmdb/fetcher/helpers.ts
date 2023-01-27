import { fetcherConfig } from "../../../types/fetchingTypes";

export const generateUrl = (config: fetcherConfig) => {
  let URL = "";

  if (config.endpointType === "getMovie") {
    URL = `https://api.themoviedb.org/3/movie/${config.movieId}?api_key=0813f3326aa955f3707a6e8d13d652f7&language=en-US`;
  }

  if (config.endpointType === "getPopularMovies") {
    URL =
      "https://api.themoviedb.org/3/movie/popular?api_key=0813f3326aa955f3707a6e8d13d652f7&language=en-US&page=1";
  }

  if (config.endpointType === "getToken") {
    URL =
      "https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7";
  }
  if (config.endpointType === "getUserId") {
    URL = `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${config.sessionId}`;
  }
  if (config.endpointType === "getFavouriteMovies") {
    URL = `https://api.themoviedb.org/3/account/${config.userId}/favorite/movies?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${config.sessionId}&language=en-US&sort_by=created_at.asc&page=1`;
  }

  return URL;
};
