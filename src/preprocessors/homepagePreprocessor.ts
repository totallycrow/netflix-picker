import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import moviesAPI from "../services/tmdb/moviesAPI";
import { selectMoviesFromList } from "../services/tmdb/utils";

const homepagePreprocessor = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  // preprocess
  const loginData = await moviesAPI.loginControl(context.req.cookies.sessionId);
  const popularMovies = await moviesAPI.getPopularMovies();

  if (popularMovies instanceof Error || "errorMessage" in popularMovies)
    return {
      props: {
        sharedData: {
          loginData: loginData,
        },
        sectionBody: {
          featuredMovies: [],
        },
      },
    };

  const selectedMovies = selectMoviesFromList(popularMovies.payload, 6);

  return {
    props: {
      sharedData: {
        loginData: loginData,
      },
      sectionBody: {
        featuredMovies: selectedMovies,
      },
    },
  };
};

export default homepagePreprocessor;
