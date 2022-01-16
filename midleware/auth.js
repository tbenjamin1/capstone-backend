import verify from "jsonwebtoken";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.status(401).json({ error: "access denied" });

  try {
    const validToken = jwt.verify(accessToken, "UsersAuth");
    req.user = validToken;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
//  admin middleware

const adimnToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "Not logged in" });

  try {
  const validToken = jwt.verify(accessToken, "UsersAuth");
    req.user = validToken;
    if (req.user.isAdmin === "true") {
      return next();
    } else {
      res.json("This user is not allowed");
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

export { adimnToken, auth };
