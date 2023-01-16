// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

import moviesAPI from "../../services/tmdb/moviesAPI";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await moviesAPI.getToken();

  console.log(token);

  if (token.success) {
    res.status(200).json({ token: token.request_token });
  }

  if ("errorMessage" in token) {
    return res.status(500).json({
      success: false,
      errorMessage: token.errorMessage,
    });
  }
}
