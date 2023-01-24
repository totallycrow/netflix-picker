import { GetServerSideProps } from "next";
import moviesAPI from "../../../services/tmdb/moviesAPI";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Header } from "../../../components/header/Header";
import { MainMenu } from "../../../components/MainMenu";
import { Image } from "@chakra-ui/react";
import { useState } from "react";

export default function MoviePage(props: any) {
  console.log(props);
  const [fav, setFav] = useState(props.isFavourite);

  const { userId, sessionId, isAuth } = props.loginData;

  console.log(fav);

  return (
    <div>
      <Header isAuth={props.loginData.isAuth} />
      <MainMenu></MainMenu>
      <div className="text-center">{props.payload.title}</div>
      <div>
        <Image
          src={"https://image.tmdb.org/t/p/w500/" + props.payload.poster_path}
          alt="Dan Abramov"
          boxSize="200px"
          objectFit="cover"
        />
      </div>

      <div>
        {fav ? (
          <div>
            <button
              onClick={() => {
                if (isAuth) {
                  moviesAPI.setFavourite(
                    userId,
                    sessionId,
                    props.payload.id,
                    false
                  );
                  setFav(false);
                }
              }}
            >
              Remove From Favourites
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                if (isAuth) {
                  moviesAPI.setFavourite(
                    userId,
                    sessionId,
                    props.payload.id,
                    true
                  );
                  setFav(true);
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
