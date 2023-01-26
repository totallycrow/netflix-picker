import { Center, Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import Layout from "../../components/layout/Layout";
import { MainMenu } from "../../components/MainMenu";
import { CardItem } from "../../components/movieCard/CardItem";
import useManageFavourites from "../../hooks/useManageFavourites";
import moviesAPI from "../../services/tmdb/moviesAPI";

export default function Favourites(props: FavouritesPageProps) {
  const [favList, setFavList] = useState(props.sectionBody.favouriteMovies);
  console.log(props);
  // if (props.sharedData.loginData.sessionId === "NOT_AUTHORIZED") {
  //   return <div>Log in to view this page</div>;
  // }
  const router = useRouter();
  const handleLink = (movieId: string) => {
    router.push("http://localhost:3000/movies/" + movieId);
  };

  const { userId, sessionId } = props.sharedData.loginData;

  useEffect(() => {
    console.log(favList);
  }, [favList]);

  return (
    <Layout isAuth={props.sharedData.loginData.isAuth}>
      <Container maxW="container.xl">
        <div>
          <h1>My Favourites</h1>

          <div>
            {favList.map((movie: IMovie) => (
              <div key={movie.id}>
                <Center>
                  <CardItem
                    imagePath={
                      "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                    }
                    title={movie.title}
                    buttonText={"Remove from favourites"}
                    id={movie.id}
                    w={"2xl"}
                    maxW={"2xl"}
                    buttonCallback={async () => {
                      await moviesAPI.setFavourite(
                        userId,
                        sessionId,
                        movie.id,
                        false
                      );
                      console.log("CALLBACK");
                      setFavList((list) => {
                        console.log(list);
                        const newList = list.filter(
                          (listMovie) => movie.id != listMovie.id
                        );
                        console.log(newList);
                        return newList;
                      });
                    }}
                    description={movie.overview.slice(0, 5000) + "..."}
                    favouriteSection={true}
                  />
                </Center>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
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
