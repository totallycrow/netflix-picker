import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import moviesAPI from "../services/tmdb/moviesAPI";
import { selectMoviesFromList } from "../services/tmdb/utils";

const FavouritesPreprocessor = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const sessionId = context.req.cookies.sessionId || "NOT_AUTHORIZED";
  const loginData = await moviesAPI.loginControl(sessionId);

  // CHECK LOGIN/AUTH
  if (!loginData.isLoggedIn || !loginData.isAuth) {
    return {
      props: {
        sharedData: {
          loginData: loginData,
        },
        sectionBody: {
          favouriteMovies: [],
        },
      },
    };
  }
  // GET MOVIES
  const movies = await moviesAPI.getFavouriteMovies(
    loginData.userId,
    sessionId
  );
  console.log(movies);

  if (movies instanceof Error || "errorMessage" in movies)
    return {
      props: {
        sharedData: {
          loginData: loginData,
        },
        sectionBody: {
          favouriteMovies: [],
        },
      },
    };

  return {
    props: {
      sharedData: {
        loginData: loginData,
      },
      sectionBody: {
        favouriteMovies: movies.favouriteMoviesList,
      },
    },
  };
};

export default FavouritesPreprocessor;
