// /api/example.js

import { serialize } from "cookie";
import { generateOAuthState } from "../../lib/auth/authUtils";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    serialize("sessionId", "", {
      path: "/",
      expires: new Date(0),
    })
  );

  // window.open("http://")

  // const a = document.createElement("a")
  // a.href = "url"
  // a.click()

  //   return res.status(200).json({
  //     success: "Successfully logged out",
  //   });
  // custom logic

  return res.redirect(307, `http://localhost:3000/`);
};

export default handler;
