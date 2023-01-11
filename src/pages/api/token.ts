// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

import moviesAPI from "../../services/tmdb/moviesAPI";

export default async function handler(req, res) {
  const handler = moviesAPI.getToken();
  const token = await fetch(
    "https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7"
  ).then((response) => response.json());
  console.log(token);
  res.status(200).json({ name: "John Doe", token: token.request_token });
}
