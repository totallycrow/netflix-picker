import { ILoginData } from "../../types/accountTypes";

export const NEW_SESSION_URL =
  "https://api.themoviedb.org/3/authentication/session/new?api_key=0813f3326aa955f3707a6e8d13d652f7";

export const erroredMovie = {
  adult: "",
  backdrop_path: "",
  genre_ids: [],
  id: "ERROR_FETCHING_DATA",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: "",
  poster_path: "",
  release_date: "",
  title: "",
  video: false,
  vote_average: "",
  vote_count: "",
};
