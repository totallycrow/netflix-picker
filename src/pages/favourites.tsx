import { GetServerSideProps } from "next";
import React from "react";
import moviesAPI from "../services/tmdb/moviesAPI";
import { RequestError } from "../services/tmdb/moviesAPI";

export default function favourites(props: IMoviesListPage) {
  console.log(props);
  if (props.sessionId === "NOT_AUTHORIZED") {
    return <div>Log in to view this page</div>;
  } else {
    return (
      <div>
        <h1>My Favourites</h1>
        <div>{props.movies[0].title}</div>
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.req.cookies.sessionId || "NOT_AUTHORIZED";

  const loginData = await moviesAPI.loginControl(sessionId);

  if (!loginData.isLoggedIn || !loginData.isAuth) {
    return {
      props: {
        loginData: loginData,
        sessionId: "NOT_AUTHORIZED",
        movies: [],
      },
    };
  }

  const movies = await moviesAPI.getFavouriteMovies(
    loginData.userId,
    sessionId
  );

  console.log(movies);

  if (movies instanceof Error || "errorMessage" in movies)
    return {
      props: {
        loginData: loginData,
        sessionId: "NOT_AUTHORIZED",
        movies: [],
      },
    };

  return {
    props: {
      loginData: loginData,
      sessionId: sessionId,
      movies: movies.favouriteMoviesList,
    },
  };
};

interface IMoviesListPage {
  loginData: any;
  sessionId: string;
  movies: Array<any>;
}
