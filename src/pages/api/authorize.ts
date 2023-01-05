// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7
const url = require("url");

export default async function handler(req, res) {
  console.log(req.url);
  await setTimeout(() => console.log("test", 1000));
  res.redirect(307, "/");
}
