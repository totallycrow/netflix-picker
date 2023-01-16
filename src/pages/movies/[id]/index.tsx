import { GetServerSideProps } from "next";
import moviesAPI from "../../../services/tmdb/moviesAPI";

export default function MoviePage(props: any) {
  console.log(props);
  console.log(props.payload.title);
  return <div>{props.payload.title}</div>;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const movieId = context.params!.id;
  console.log("PARAMS:", movieId);
  const sessionId = context.req.cookies.sessionId || "NOT_AUTHORIZED";
  const loginData = await moviesAPI.loginControl(sessionId);

  // const test = await moviesAPI.getPopularMovies();
  console.log("///////// INDEX ");
  // console.log(test);

  // const movieData = await moviesAPI.getMovie("315162");
  const movieData = await moviesAPI.getMovie(movieId);
  console.log(movieData);

  return {
    props: {
      loginData: loginData,
      ...movieData,
    },
  };
};

type HomePageProps = {
  loginData: any;
};
