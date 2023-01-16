// /api/example.js
import { serialize } from "cookie";
import { generateSessionQuery } from "../../services/tmdb/utils";
import { NEW_SESSION_URL } from "../../services/tmdb/static";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.request_token;
  console.log(token);

  if (typeof token !== "string" || !token || token === "ERROR") {
    console.log("Invalid Token");
    res.setHeader(
      "Set-Cookie",
      serialize("sessionId", "INVALID_TOKEN", { path: "/" })
    );
    return res.redirect(307, `http://localhost:3000/`);
  }

  const query = generateSessionQuery(token);
  const session = await fetch(NEW_SESSION_URL, query).then((res) => res.json());

  // set cookie
  res.setHeader(
    "Set-Cookie",
    serialize("sessionId", session.session_id, { path: "/" })
  );

  // res.status(200).json({ name: "John Doe", token: data.username });
  return res.redirect(307, `http://localhost:3000/`);
};

export default handler;
