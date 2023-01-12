import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

export default function Home(props: PageProps) {
  const [isAuthorized, setIsAuthorized] = useState(0);
  const [test, setTest] = useState("");

  console.log(props);

  useEffect(() => {
    if (props.isAuth) setIsAuthorized(1);
  }, [isAuthorized]);

  const handleLogout = async () => {
    const query = {
      request_token: "",
    };
    // localStorage.removeItem("sessionAccess");
    // setIsAuthorized(0);
    await fetch("http://localhost:3000/api/logout", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    window.location.href = "http://localhost:3000/";
  };

  // https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=xxx
  useEffect(() => {
    if (!isAuthorized) {
      setTest("");
      return;
    }

    const getUserData = async () => {
      const x = localStorage.getItem("sessionAccess");
      console.log(x);
      const stateId = props.sessionId;

      const data = await fetch(
        `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${stateId}`
      ).then((res) => res.json());
      console.log(data);
      setTest(data.username);
    };
    getUserData();
  }, [isAuthorized]);

  return (
    <div>
      <h1>test</h1>

      <div>Is Authorised? {isAuthorized}</div>
      <div>Test: {test}</div>

      <a href="http://localhost:3000/api/login">Login</a>
      <div></div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

type PageProps = {
  isAuth: boolean;
  sessionId: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const sessionId = context.req.cookies.sessionId;

  if (sessionId === undefined || sessionId.length === 0)
    return {
      props: {
        isAuth: false,
        sessionId: "",
      },
    };

  // validate if session still valid
  const data = await fetch(
    `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`
  ).then((res) => res.json());
  console.log(data);

  if (data.success === false) {
    return {
      props: {
        isAuth: false,
        sessionId: "",
      },
    };
  }

  return {
    props: {
      isAuth: true,
      sessionId: sessionId,
    },
  };
};
