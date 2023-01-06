import { useEffect, useState } from "react";
import { generateOAuthState } from "../lib/oauth/oauthUtils";

// https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7

export default function Home() {
  const [token, setToken] = useState("");
  const [sessionState, setSessionState] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(0);
  const [test, setTest] = useState("");
  // generateOAuthState();

  // if (typeof window !== "undefined") {
  //   // Client-side-only code
  //   const top = window.outerHeight;
  //   console.log(top);
  // }

  useEffect(() => {
    const cookie = localStorage.getItem("sessionAccess");
    if (cookie === null) return;
    const val = JSON.parse(cookie);

    if (val.sessionID.length === 40 && val.successfull === true)
      setIsAuthorized(1);
  }, [isAuthorized]);

  const handleAuth = async () => {
    const token = await fetch("./api/token").then((res) => res.json());

    console.log(token.token);
    setToken(token.token);

    localStorage.setItem("token", token.token);

    const ses = generateOAuthState();
    console.log(ses);

    setSessionState(ses);
    localStorage.setItem("sessionID", ses);

    window.location.href = `https://www.themoviedb.org/authenticate/${token.token}?redirect_to=http://localhost:3000/auth?stateId=${ses}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionAccess");
    setIsAuthorized(0);
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
      const stateId = JSON.parse(x).sessionID;

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
      <div>Token: {token}</div>
      <div>Session ID: {sessionState}</div>
      <div>Is Authorised? {isAuthorized}</div>
      <div>Test: {test}</div>
      <button onClick={handleAuth}>Login with IMDB</button>
      <div></div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
