import { GetServerSideProps } from "next";
import React from "react";
import moviesAPI from "../services/tmdb/moviesAPI";

export default function favourites(props) {
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

  console.log("*******************");
  console.log(sessionId);

  if (sessionId === "NOT_AUTHORIZED")
    return {
      props: {
        sessionId: "NOT_AUTHORIZED",
        movies: [],
      },
    };

  // const data = await fetch(
  //   `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`
  // ).then((res) => res.json());
  // console.log(data);

  const data = await moviesAPI.getUserId(sessionId);
  console.log(data);

  if (data instanceof Error)
    return {
      props: {
        sessionId: "NOT_AUTHORIZED",
        movies: [],
      },
    };

  // const movies = await fetch(
  //   `https://api.themoviedb.org/3/account/${data.userId}/favorite/movies?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
  // ).then((movies) => movies.json());

  const movies = await moviesAPI.getFavouriteMovies(data.userId, sessionId);

  console.log(movies);

  if (!data || !movies || movies instanceof Error)
    return {
      props: {
        sessionId: "NOT_AUTHORIZED",
        movies: [],
      },
    };

  return {
    props: {
      sessionId: sessionId,
      movies: movies.favouriteMoviesList,
    },
  };
};
