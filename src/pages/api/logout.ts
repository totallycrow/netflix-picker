import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    serialize("sessionId", "", {
      path: "/",
      expires: new Date(0),
    })
  );

  return res.redirect(307, `http://localhost:3000/`);
};

export default handler;
