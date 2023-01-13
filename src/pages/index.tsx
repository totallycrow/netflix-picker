import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import moviesAPI from "../services/tmdb/moviesAPI";

// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

export default function Home(props: any) {
  const [isAuthorized, setIsAuthorized] = useState(0);
  const [testUserData, setTestUserData] = useState("");

  useEffect(() => {
    if (props.loginData.isAuth) setIsAuthorized(1);
  }, [isAuthorized, props.loginData.isAuth]);

  useEffect(() => {
    if (!isAuthorized) {
      setTestUserData("");
      return;
    }
    setTestUserData(props.loginData.userId);
  }, [isAuthorized, props.loginData.userId]);

  return (
    <div>
      <h1>test</h1>

      <div>Is Authorised? {isAuthorized}</div>
      <div>Test: {testUserData}</div>

      <a href="http://localhost:3000/api/login">Login</a>
      <div></div>
      <a href="http://localhost:3000/api/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const sessionId = context.req.cookies.sessionId || "NOT_AUTHORIZED";
  const loginData = await moviesAPI.loginControl(sessionId);

  if (!loginData.isLoggedIn || !loginData.isAuth || loginData === undefined) {
    return {
      props: {
        loginData: loginData,
        sessionId: "NOT_AUTHORIZED",
      },
    };
  }

  return {
    props: {
      loginData: loginData,
      sessionId: "NOT_AUTHORIZED",
    },
  };
};

type HomePageProps = {
  loginData: any;
  sessionId: string;
};
