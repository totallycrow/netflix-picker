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

  const { userId, sessionId, isAuth } = props.loginData;
  const { title, poster_path } = props.payload;

  const { imagePath, setFavourite, fav } = useManageFavourites(
    props.isFavourite,
    props.loginData,
    props.payload
  );

  return (
    <div>
      <Header isAuth={isAuth} />
      <MainMenu></MainMenu>
      <div className="">{title}</div>
      <div>
        <Image
          src={"https://image.tmdb.org/t/p/w500/" + poster_path}
          alt="Dan Abramov"
          boxSize="200px"
          objectFit="cover"
        />
      </div>

      <div>
        {fav ? (
          <div>
            <button onClick={() => setFavourite(false)}>
              Remove From Favourites
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                if (isAuth) {
                  setFavourite(true);
                } else {
                  alert("Log in to add to favourites!");
                }
              }}
            >
              Add To Favourites
            </button>
          </div>
        )}
      </div>
      {/* <CardItem
        imageLink={
          "https://image.tmdb.org/t/p/w500/" + props.payload.poster_path
        }
        title={props.payload.title}
        loginData={props.loginData}
        payload={props.payload}
      /> */}
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
  const movieData = await moviesAPI.getMovie(movieId);

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

  const movies = await moviesAPI.getFavouriteMovies(
    loginData.userId,
    sessionId
  );

  if (!loginData.isAuth) {
    return {
      props: {
        loginData: loginData,
        sessionId: "NOT_AUTHORIZED",
        isFavourite: false,

        ...movieData,
      },
    };
  }

  const favMoviesIds = movies.favouriteMoviesList.map((movie) => movie.id);

  const isFav = favMoviesIds.some((id) => {
    console.log(id);
    console.log(movieData.payload.id);

    return movieData.payload.id === id;
  });
  console.log(isFav);

  return {
    props: {
      loginData: loginData,
      sessionId: "NOT_AUTHORIZED",
      isFavourite: isFav,

      ...movieData,
    },
  };
};

type HomePageProps = {
  loginData: any;
  sessionId: string;
};

interface ILoginData {
  isLoggedIn: boolean;
  isAuth: boolean;
  sessionId: string;
  userId: any;
  message: string;
  lastValidated: string;
}
