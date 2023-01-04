import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: "moviedb",
      name: "movieDB",
      type: "oauth",
      authorization: "https://www.themoviedb.org/authenticate",
      token:
        "https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7",

      clientId: "moviedb",
    },
  ],
};

export default NextAuth(authOptions);
