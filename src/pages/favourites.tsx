import React from "react";

export default function favourites(props) {
  console.log(props);
  return <div>favourites</div>;
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
