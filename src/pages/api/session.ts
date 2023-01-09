// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7
const url = require("url");

export default async function handler(req, res) {
  console.log(req.query.token);

  const query = {
    request_token: req.query.token,
  };
  const URL =
    "https://api.themoviedb.org/3/authentication/session/new?api_key=0813f3326aa955f3707a6e8d13d652f7";

  const sessionID = await fetch(URL, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  console.log(sessionID);
  console.log("API ROUTE");

  res.status(200).json(sessionID);
}
