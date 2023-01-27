import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import moviesAPI from "../services/tmdb/moviesAPI";
import { generateErrorMovieObject } from "../services/tmdb/utils";
import { selectMoviesFromList } from "../services/tmdb/utils";

const moviepagePreprocessor = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const movieIdParam = context.params!.id;
  const sessionId = context.req.cookies.sessionId;
  const loginData = await moviesAPI.loginControl(sessionId);

  if (!movieIdParam) return generateErrorMovieObject(loginData);

  const movieId = Array.isArray(movieIdParam) ? movieIdParam[0] : movieIdParam;
  const movieData = await moviesAPI.getMovie(movieId);

  if (movieData instanceof Error || "errorMessage" in movieData)
    return generateErrorMovieObject(loginData);

  const isFav = await moviesAPI.isFavourite(
    loginData.userId,
    loginData.sessionId,
    movieId
  );

  return {
    props: {
      sharedData: {
        loginData: loginData,
      },
      sectionBody: {
        isFavourite: isFav,
        movieData: movieData.payload,
      },
    },
  };
};

export default moviepagePreprocessor;
