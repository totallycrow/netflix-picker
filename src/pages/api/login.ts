// /api/example.js

import { generateOAuthState } from "../../lib/auth/authUtils";
import moviesAPI from "../../services/tmdb/moviesAPI";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // MIDDLEWARE - CHECK IF ALREADY LOGGED IN -> REDIRECT TO HOME
  // const token = await fetch(
  //   "https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7"
  // ).then((response) => response.json());

  const token = await moviesAPI.getToken();
  console.log(token);

  if (token instanceof Error) {
    console.log("ERROR");
    return res.redirect(307, `http://localhost:3000/`);
  }

  return res.redirect(
    307,
    `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:3000/api/auth?token=${token.request_token}`
  );
};

export default handler;
