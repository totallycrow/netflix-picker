import { GetServerSideProps } from "next";
import React from "react";
import moviesAPI from "../services/tmdb/moviesAPI";

export default function favourites(props: FavouritesPageProps) {
  console.log(props);
  // if (props.sharedData.loginData.sessionId === "NOT_AUTHORIZED") {
  //   return <div>Log in to view this page</div>;
  // }

  return (
    <div>
      <h1>My Favourites</h1>

      <div>
        {props.sectionBody.favouriteMovies.map((movie: IMovie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
}

// /adasd/#/asdasdad

// pipe

export const getServerSideProps: GetServerSideProps = async (context) => {
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

// ********************************************************
type FavouritesPageProps = {
  sharedData: {
    loginData: ILoginData;
  };
  sectionBody: {
    favouriteMovies: IMovie[];
  };
};

interface ILoginData {
  isLoggedIn: boolean;
  isAuth: boolean;
  sessionId: string;
  userId: any;
  message: string;
  lastValidated: string;
}

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: string;
  vote_count: string;
}
