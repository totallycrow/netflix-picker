// /api/example.js

import { serialize } from "cookie";
import { generateOAuthState } from "../../lib/oauth/oauthUtils";

const handler = async function (req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("sessionId", "", {
      path: "/",
      expires: new Date(0),
    })
  );
  //   return res.status(200).json({
  //     success: "Successfully logged out",
  //   });
  // custom logic

  return res.redirect(307, `http://localhost:3000/`);
};

export default handler;
