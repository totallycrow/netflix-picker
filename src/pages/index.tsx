import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import moviesAPI from "../services/tmdb/moviesAPI";

// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

export default function Home(props: HomePageProps) {
  const [isAuthorized, setIsAuthorized] = useState(0);
  const [testUserData, setTestUserData] = useState("");

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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const sessionId = context.req.cookies.sessionId || "NOT_AUTHORIZED";
  const loginData = await moviesAPI.loginControl(sessionId);

  const test = await moviesAPI.getPopularMovies();
  console.log("///////// POPULAR MOVIES");
  console.log(test);

  return {
    props: {
      sharedData: {
        loginData: loginData,
      },
      sectionBody: {
        feaaturedMovies: {},
      },
    },
  };
};

type HomePageProps = {
  sharedData: {
    loginData: ILoginData;
  };
  sectionBody: {
    feaaturedMovies: {};
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
