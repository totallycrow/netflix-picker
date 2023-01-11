import { useEffect, useState } from "react";
import { generateOAuthState } from "../lib/auth/authUtils";

// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

export default function Home(props) {
  const [isAuthorized, setIsAuthorized] = useState(0);
  const [test, setTest] = useState("");

  console.log(props);

  useEffect(() => {
    const cookie = props.sessionId;
    if (cookie === null) return;

    if (cookie.length === 40) setIsAuthorized(1);
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

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;

  console.log(cookies);

  if (Object.keys(cookies).length === 0)
    return {
      props: {
        sessionId: "",
      },
    };

  return {
    props: {
      sessionId: cookies.sessionId,
    },
  };
}
