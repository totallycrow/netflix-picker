import { GetServerSideProps } from "next";
import moviesAPI, { IMovie } from "../../../services/tmdb/moviesAPI";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Header } from "../../../components/header/Header";
import { MainMenu } from "../../../components/MainMenu";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { CardItem } from "../../../components/movieCard/CardItem";
import useManageFavourites from "../../../hooks/useManageFavourites";

interface IMovieProps {
  isFavourite: boolean;
  loginData: ILoginData;
  payload: IMovie;
}

export default function MoviePage(props: IMovieProps) {
  console.log(props);
  const { isAuth } = props.loginData;

  const { imagePath, setFavourite, fav, buttonText } = useManageFavourites(
    props.isFavourite,
    props.loginData,
    props.payload
  );

  if (props.payload.id === "ERROR_FETCHING_DATA")
    return (
      <div>
        <div>
          <Header isAuth={isAuth} />
          <MainMenu></MainMenu>
          <div>Cannot find movie data</div>
        </div>
      </div>
    );

  const { title, poster_path } = props.payload;

  console.log(imagePath);
  console.log(buttonText);

  return (
    <div>
      <Header isAuth={isAuth} />
      <MainMenu></MainMenu>
      <CardItem
        imagePath={imagePath}
        title={title}
        buttonText={buttonText}
        buttonCallback={setFavourite}
      />
    </div>
  );
}

// chakra-ui

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const movieId = context.params!.id;

  console.log("PARAMS:", movieId);
  const sessionId = context.req.cookies.sessionId || "NOT_AUTHORIZED";
  const loginData = await moviesAPI.loginControl(sessionId);

  // const movieData = await moviesAPI.getMovie("315162");

  if (!movieId)
    return {
      props: {
        loginData: loginData,
        sessionId: "NOT_AUTHORIZED",
        isFavourite: false,
        payload: erroredMovie,
      },
    };

  const movieData = await moviesAPI.getMovie(movieId[0]);

  // const router = useRouter();

  // if (!loginData.isLoggedIn || !loginData.isAuth || loginData === undefined) {
  //   return {
  //     props: {
  //       loginData: loginData,
  //       sessionId: "NOT_AUTHORIZED",
  //     },
  //     // redirect: {
  //     //   destination: "/",
  //     //   permanent: false,
  //     // },
  //   };
  // }
  console.log("&&&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  // console.log(movieData);

  const isFav = await moviesAPI.isFavourite(
    loginData.userId,
    sessionId,
    movieId[0]
  );

  // const movies = await moviesAPI.getFavouriteMovies(
  //   loginData.userId,
  //   sessionId
  // );

  // if (!loginData.isAuth) {
  //   return {
  //     props: {
  //       loginData: loginData,
  //       isFavourite: false,
  //       ...movieData,
  //     },
  //   };
  // }

  // const favMoviesIds = movies.favouriteMoviesList.map((movie) => movie.id);

  // const isFav = favMoviesIds.some((id) => {
  //   console.log(id);
  //   console.log(movieData.payload.id);

  //   return movieData.payload.id === id;
  // });
  // console.log(isFav);

  return {
    props: {
      loginData: loginData,
      isFavourite: isFav,
      ...movieData,
    },
  };
};

type HomePageProps = {
  loginData: ILoginData;
};

interface ILoginData {
  isLoggedIn: boolean;
  isAuth: boolean;
  sessionId: string;
  userId: any;
  message: string;
  lastValidated: string;
}

const erroredMovie = {
  adult: "",
  backdrop_path: "",
  genre_ids: [],
  id: "ERROR_FETCHING_DATA",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: "",
  poster_path: "",
  release_date: "",
  title: "",
  video: false,
  vote_average: "",
  vote_count: "",
};
