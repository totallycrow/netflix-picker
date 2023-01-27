import { GetServerSideProps } from "next";
import moviesAPI, { IMovie } from "../../../services/tmdb/moviesAPI";
import { Center } from "@chakra-ui/react";
import { CardItem } from "../../../components/movieCard/CardItem";
import useManageFavourites from "../../../hooks/useManageFavourites";
import Layout from "../../../components/layout/Layout";
import { erroredMovie } from "../../../services/tmdb/static";
import { MoviesList } from "../../../components/moviesList/moviesList";

export default function MoviePage(props: IMovieProps) {
  console.log(props);
  const { isAuth } = props.sharedData.loginData;

  const { imagePath, setFavourite, fav, buttonText } = useManageFavourites(
    props.movieData.isFavourite,
    props.sharedData.loginData,
    props.movieData
  );

  if (props.movieData.id === "ERROR_FETCHING_DATA")
    return (
      <div>
        <div>
          <div>Cannot find movie data</div>
        </div>
      </div>
    );

  const { title, poster_path } = props.movieData;

  console.log(imagePath);
  console.log(buttonText);

  return (
    <Layout isAuth={props.sharedData.loginData.isAuth}>
      <div>
        <Center>
          <MoviesList
            favList={[props.movieData]}
            callback={setFavourite}
            buttonText={buttonText}
            favouriteSection={true}
          />
        </Center>
      </div>
    </Layout>
  );
}

// chakra-ui

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const movieIdParam = context.params!.id;

  console.log("PARAMS:", movieIdParam);
  const sessionId = context.req.cookies.sessionId || "NOT_AUTHORIZED";
  const loginData = await moviesAPI.loginControl(sessionId);

  // const movieData = await moviesAPI.getMovie("315162");

  if (!movieIdParam)
    return {
      props: {
        loginData: loginData,
        sessionId: "NOT_AUTHORIZED",
        isFavourite: false,
        payload: erroredMovie,
      },
    };

  console.log("_____-_--_----_______");
  console.log(movieIdParam);

  // test for array
  const movieId = Array.isArray(movieIdParam) ? movieIdParam[0] : movieIdParam;
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

  const isFav = await moviesAPI.isFavourite(
    loginData.userId,
    sessionId,
    movieId
  );
  console.log(isFav);

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
      sharedData: {
        loginData,
      },
      movieData: {
        isFavourite: isFav,
        ...movieData.payload,
      },
    },
  };
};
