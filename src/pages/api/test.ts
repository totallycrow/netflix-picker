// /api/example.js

import { generateOAuthState } from "../../lib/oauth/oauthUtils";

const handler = async function (req, res) {
  const token = await fetch("http://localhost:3000/api/token").then((res) =>
    res.json()
  );
  const session = generateOAuthState();

  // custom logic
  return res.redirect(
    307,
    `https://www.themoviedb.org/authenticate/${token.token}?redirect_to=http://localhost:3000/api/test2?token=${token.token}`
  );
};

export default handler;
