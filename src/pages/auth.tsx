import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Auth() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [session, setSession] = useState(false);

  //   check URL queries
  useEffect(() => {
    if (!router.isReady) return;
    // if (session || isAuth) {
    //   window.location.href = "http://localhost:3000";
    // }

    console.log("Test1");

    const storedSession = localStorage.getItem("sessionID");
    const storedRequestToken = localStorage.getItem("token");

    const querySession = router.query.stateId;
    const queryToken = router.query.request_token;

    console.log(storedSession);

    console.log(storedRequestToken);

    if (storedSession === querySession && storedRequestToken === queryToken) {
      console.log("true");
      setIsAuth(true);
    } else {
      console.log("false");
    }

    console.log("cookiedata");

    const cookie = localStorage.getItem("sessionAccess");

    if (cookie) {
      const { requestingToken, sessionID, sessionState } = JSON.parse(
        localStorage.getItem("sessionAccess")
      );

      if (
        requestingToken === queryToken &&
        sessionState === querySession &&
        sessionID.length === 40
      ) {
        window.location.href = "http://localhost:3000";
      }
    }

    // if(cookieData.)
  }, [router.isReady]);

  //   if queries match, request session from tmdb
  useEffect(() => {
    if (!isAuth) return;
    if (session) return;
    console.log(isAuth);
    const storedRequestToken = localStorage.getItem("token");
    const savedSession = localStorage.getItem("sessionID");
    const fetchSession = async () => {
      const data = await fetch(
        `./api/session?token=${storedRequestToken}`
      ).then((res) => res.json());
      console.log(data);

      if (savedSession === data.session_id) {
        console.log("true");
        return;
      } else {
        console.log("false");
      }

      const sessionData = {
        successfull: true,
        requestingToken: storedRequestToken,
        sessionState: savedSession,
        sessionID: data.session_id,
      };

      localStorage.setItem("sessionAccess", JSON.stringify(sessionData));
      setSession(true);
      window.location.href = "http://localhost:3000";
    };

    fetchSession();
  }, [isAuth]);

  return (
    <div>
      auth
      <div>
        Session: {session ? localStorage.getItem("session") : "not authorized"}
      </div>
    </div>
  );
}
