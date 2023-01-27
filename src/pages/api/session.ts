const url = require("url");
import type { NextApiRequest, NextApiResponse } from "next";

const URL =
  "https://api.themoviedb.org/3/authentication/session/new?api_key=0813f3326aa955f3707a6e8d13d652f7";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = {
    request_token: req.query.token,
  };

  const sessionID = await fetch(URL, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
  res.status(200).json(sessionID);
}
