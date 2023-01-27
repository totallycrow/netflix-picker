import moviesAPI from "../../services/tmdb/moviesAPI";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO -> MIDDLEWARE - CHECK IF ALREADY LOGGED IN -> REDIRECT TO HOME

  const token = await moviesAPI.getToken();
  console.log(token);

  if (token instanceof Error || !token.success) {
    console.log("ERROR");
    return res.redirect(307, `http://localhost:3000/`);
  }

  return res.redirect(
    307,
    `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:3000/api/auth?token=${token.request_token}`
  );
};

export default handler;
