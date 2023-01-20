import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import moviesAPI from "../services/tmdb/moviesAPI";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { CardItem } from "../components/CardItem";
import { Box } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Link from "next/link";

// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

export default function Home(props: HomePageProps) {
  const [isAuthorized, setIsAuthorized] = useState(0);
  const [testUserData, setTestUserData] = useState("");
  console.log(props);
  console.log(props.sectionBody.featuredMovies.payload[0].backdrop_path);

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
    <div>
      <h1>test</h1>

      <div>Is Authorised? {isAuthorized}</div>
      <div>Test: {testUserData}</div>

      <a href="http://localhost:3000/api/login">Login</a>
      <div></div>
      <a href="http://localhost:3000/api/logout">Logout</a>
      <div></div>
      <a href="http://localhost:3000/favourites">Favourites List</a>
      <div></div>

      {/* <CardItem></CardItem> */}
      <Container maxW="container.xl" bg="blue.600">
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={6}
        >
          <GridItem w="100%" bg="blue.500">
            <Center>
              <Box padding="4" bg="blue.400" color="black" maxW="md">
                <Link
                  href={
                    "http://localhost:3000/movies/" +
                    props.sectionBody.featuredMovies.payload[0].id
                  }
                >
                  <Image
                    src={
                      "https://image.tmdb.org/t/p/w500/" +
                      props.sectionBody.featuredMovies.payload[0].poster_path
                    }
                    alt="Dan Abramov"
                    boxSize="200px"
                    objectFit="cover"
                  />
                </Link>
              </Box>
            </Center>
          </GridItem>
          <GridItem w="100%" bg="blue.500" />
          <GridItem w="100%" bg="blue.500" />
          <GridItem w="100%" bg="blue.500" />
          <GridItem w="100%" bg="blue.500" />
          <GridItem w="100%" bg="blue.500" />
        </Grid>

        {/* <CardItem></CardItem> */}
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const loginData = await moviesAPI.loginControl(context.req.cookies.sessionId);

  // typeof value === "number" && !isNaN(value)

  const test = await moviesAPI.getPopularMovies();
  console.log("///////// POPULAR MOVIES");
  // console.log(test);

  return {
    props: {
      sharedData: {
        loginData: loginData,
      },
      sectionBody: {
        featuredMovies: test,
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
    featuredMovies: {};
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
