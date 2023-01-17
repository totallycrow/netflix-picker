import { GetServerSideProps } from "next";
import moviesAPI from "../../../services/tmdb/moviesAPI";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

export default function MoviePage(props: any) {
  console.log(props);

  return (
    <div>
      <div></div>
      {props.payload.title}
      <div></div>
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

  const test = await moviesAPI.getPopularMovies();
  console.log("///////// POPULAR MOVIES");
  console.log(test);

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

  return {
    props: {
      loginData: loginData,
      sessionId: "NOT_AUTHORIZED",
      ...movieData,
    },
  };
};

type HomePageProps = {
  loginData: any;
  sessionId: string;
};
