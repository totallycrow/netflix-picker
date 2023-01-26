import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import moviesAPI from "../services/tmdb/moviesAPI";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { CardItem } from "../components/movieCard/CardItem";
import { Box } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Link from "next/link";
import { Header } from "../components/header/Header";
import { MainMenu } from "../components/MainMenu";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

export default function Home(props: HomePageProps) {
  const [isAuthorized, setIsAuthorized] = useState(0);
  const [testUserData, setTestUserData] = useState("");
  const router = useRouter();
  console.log(props);

  const handleLink = (movieId: string) => {
    router.push("http://localhost:3000/movies/" + movieId);
  };

  useEffect(() => {
    if (props.sharedData.loginData.isAuth) setIsAuthorized(1);
  }, [isAuthorized, props.sharedData.loginData.isAuth]);

  useEffect(() => {
    if (!isAuthorized) {
      setTestUserData("");
      return;
    }
    setTestUserData(props.sharedData.loginData.userId);
  }, [isAuthorized, props.sharedData.loginData.userId]);

  return (
    <Layout isAuth={props.sharedData.loginData.isAuth}>
      {/* <h1>test</h1>

      <div>Is Authorised? {isAuthorized}</div>
      <div>Test: {testUserData}</div>

      <a href="http://localhost:3000/api/login">Login</a>
      <div></div>
      <a href="http://localhost:3000/api/logout">Logout</a>
      <div></div>
      <a href="http://localhost:3000/favourites">Favourites List</a>
      <div></div> */}

      {/* <CardItem></CardItem> */}
      <Container maxW="container.xl">
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={6}
        >
          {props.sectionBody.featuredMovies.map((movie) => {
            return (
              // <div key={movie.id}>
              //   <GridItem w="100%">
              //     <Center>
              //       <Box padding="4" color="black" maxW="md">
              //         <Link href={"http://localhost:3000/movies/" + movie.id}>
              //           <Image
              //             src={
              //               "https://image.tmdb.org/t/p/w500/" +
              //               movie.poster_path
              //             }
              //             alt="Dan Abramov"
              //             boxSize="200px"
              //             objectFit="cover"
              //           />
              //         </Link>
              //       </Box>
              //     </Center>
              //   </GridItem>
              // </div>
              <div key={movie.id}>
                <CardItem
                  imagePath={
                    "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                  }
                  title={movie.title}
                  buttonText={"see more"}
                  buttonCallback={() => handleLink(movie.id)}
                  description={movie.overview.slice(0, 100) + "..."}
                  favouriteSection={true}
                  id={movie.id}
                />
              </div>
            );
          })}
        </Grid>

        {/* <CardItem></CardItem> */}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const loginData = await moviesAPI.loginControl(context.req.cookies.sessionId);

  // typeof value === "number" && !isNaN(value)

  const test = await moviesAPI.getPopularMovies();
  console.log("///////// POPULAR MOVIES");
  console.log(test);

  let selectedMovies = [];
  for (let i = 0; i < 6; i++) {
    selectedMovies.push(test.payload[i]);
  }
  console.log(selectedMovies);

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

// ************** TYPES & INTERFACES **************
type HomePageProps = {
  sharedData: {
    loginData: ILoginData;
  };
  sectionBody: {
    featuredMovies: IMovie[];
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

export interface IMovie {
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
