// **************************************************
// *************** LOGIN CONTROL ********************
// **************************************************

export const loginController = async (sessionId: string | undefined) => {
  const timeStamp = new Date(Date.now()).toUTCString();

  // Check if cookie exists
  if (sessionId === "NOT_AUTHORIZED" || !sessionId) {
    return {
      isLoggedIn: false,
      isAuth: false,
      sessionId: "NOT_AUTHORIZED",
      userId: "NOT_FOUND",
      message: "Invalid sessionId value",
      lastValidated: timeStamp,
    };
  }

  // If cookie exists, check if session is still valid
  const data = await fetch(
    `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`
  ).then((res) => res.json());

  console.log(data);

  if (data.success === false) {
    return {
      isLoggedIn: true,
      isAuth: false,
      sessionId: "NOT_AUTHORIZED",
      userId: "NOT_FOUND",
      message: "SessionId rejected",
      lastValidated: timeStamp,
    };
  }

  return {
    isLoggedIn: true,
    isAuth: true,
    sessionId: sessionId,
    userId: data.id,
    message: "SessionId accepted",
    lastValidated: timeStamp,
  };
};
