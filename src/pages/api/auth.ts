// /api/example.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";
import { generateQuery } from "../../services/tmdb/utils";
import { NEW_SESSION_URL } from "../../services/tmdb/static";

const handler = async function (req, res) {
  const token = req.query.request_token;
  console.log(token);

  const query = generateQuery(token);

  const session = await fetch(NEW_SESSION_URL, query).then((res) => res.json());

  const data = await fetch(
    `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${session.session_id}`
  ).then((res) => res.json());

  // custom logic
  // return res.redirect(
  //   307,
  //   `https://www.themoviedb.org/authenticate/${token.token}?redirect_to=http://localhost:3000/auth?stateId=${session}`
  // );
  console.log(data);

  // set cookie
  res.setHeader(
    "Set-Cookie",
    serialize("sessionId", session.session_id, { path: "/" })
  );

  // res.status(200).json({ name: "John Doe", token: data.username });

  return res.redirect(307, `http://localhost:3000/`);
};

export default handler;